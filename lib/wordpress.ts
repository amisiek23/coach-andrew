/**
 * WordPress REST API client
 *
 * All functions use Next.js fetch() with ISR revalidation (60 s by default).
 * Set NEXT_PUBLIC_WP_URL in .env.local to point at your WordPress install.
 */

import type { WPPost, WPPage, WPMedia, WPCategory, WPSiteInfo, WPMenuItem, NavLink } from "./types";

const WP_URL =
  process.env.NEXT_PUBLIC_WP_URL ||
  "https://wpstrona.wpmudev.host/coachandrew";

const API = `${WP_URL}/wp-json/wp/v2`;

// Optional Basic-auth header for authenticated endpoints (e.g. menus)
function authHeader(): HeadersInit {
  const token = process.env.WP_AUTH_TOKEN; // "username:app_password"
  if (!token) return {};
  return {
    Authorization: `Basic ${Buffer.from(token).toString("base64")}`,
  };
}

// ---------------------------------------------------------------------------
// Generic fetcher with ISR
// ---------------------------------------------------------------------------
async function wpFetch<T>(
  path: string,
  revalidate = 60,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${API}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: authHeader(),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`WP API error ${res.status} for ${url.toString()}`);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Site info
// ---------------------------------------------------------------------------
export async function getSiteInfo(): Promise<WPSiteInfo> {
  const res = await fetch(`${WP_URL}/wp-json/`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return {
    name: data.name,
    description: data.description,
    url: data.url,
    home: data.home,
  };
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------
export async function getPosts(perPage = 100): Promise<WPPost[]> {
  return wpFetch<WPPost[]>("/posts", 60, {
    per_page: String(perPage),
    _embed: "1",
  });
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>("/posts", 60, {
    slug,
    _embed: "1",
  });
  return posts[0] ?? null;
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------
export async function getPages(): Promise<WPPage[]> {
  return wpFetch<WPPage[]>("/pages", 60, {
    per_page: "100",
    _embed: "1",
  });
}

export async function getPage(slug: string): Promise<WPPage | null> {
  try {
    const pages = await wpFetch<WPPage[]>("/pages", 60, {
      slug,
      _embed: "1",
    });
    return pages[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPageById(id: number): Promise<WPPage | null> {
  try {
    return await wpFetch<WPPage>(`/pages/${id}`, 60, { _embed: "1" });
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------
export async function getMedia(id: number): Promise<WPMedia | null> {
  try {
    return await wpFetch<WPMedia>(`/media/${id}`, 3600);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export async function getCategories(): Promise<WPCategory[]> {
  return wpFetch<WPCategory[]>("/categories", 3600, { per_page: "100" });
}

export async function getCategory(slug: string): Promise<WPCategory | null> {
  const cats = await wpFetch<WPCategory[]>("/categories", 3600, { slug });
  return cats[0] ?? null;
}

// ---------------------------------------------------------------------------
// Posts by category
// ---------------------------------------------------------------------------
export async function getPostsByCategory(
  categoryId: number,
  perPage = 100
): Promise<WPPost[]> {
  return wpFetch<WPPost[]>("/posts", 60, {
    categories: String(categoryId),
    per_page: String(perPage),
    _embed: "1",
  });
}

// ---------------------------------------------------------------------------
// SureCart products  (sc_product custom post type)
// ---------------------------------------------------------------------------

export interface WPProduct {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  _embedded?: { "wp:featuredmedia"?: WPMedia[] };
}

export async function getProducts(perPage = 100): Promise<WPProduct[]> {
  try {
    return await wpFetch<WPProduct[]>("/sc_product", 60, {
      per_page: String(perPage),
      _embed: "1",
    });
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Navigation menus (requires WP_AUTH_TOKEN)
// ---------------------------------------------------------------------------

/**
 * Fetch nav links for the primary menu and build a nested NavLink tree.
 * Falls back to an empty array if WP_AUTH_TOKEN is not set.
 *
 * Strategy:
 *  1. Fetch all registered menus to find the primary/header one.
 *  2. Fetch menu-items filtered to that single menu ID so items from
 *     footer/mobile menus are not mixed in (which causes duplicates).
 */
export async function getNavLinks(): Promise<NavLink[]> {
  if (!process.env.WP_AUTH_TOKEN) return [];

  try {
    // Step 1 – find the primary menu ID
    const menusRes = await fetch(`${API}/menus?per_page=100`, {
      headers: authHeader(),
      next: { revalidate: 3600 },
    });

    let menuId: number | null = null;
    if (menusRes.ok) {
      const menus: Array<{ id: number; slug: string; locations: string[] }> =
        await menusRes.json();
      // Prefer menus assigned to a "primary"-ish location, else take the first
      const primary =
        menus.find(
          (m) =>
            m.locations?.some((l) =>
              ["primary", "main", "header", "top"].includes(l)
            ) || m.slug === "primary"
        ) ?? menus[0];
      menuId = primary?.id ?? null;
    }

    // Step 2 – fetch items for that menu only (or all items if no menu found)
    const params: Record<string, string> = { per_page: "100" };
    if (menuId) params.menus = String(menuId);

    const items = await wpFetch<WPMenuItem[]>("/menu-items", 3600, params);

    // Step 3 – build a nested tree keyed by WP item ID
    const map = new Map<number, NavLink & { _id: number; _parent: number }>();
    for (const item of items) {
      map.set(item.id, {
        _id: item.id,
        _parent: item.parent,
        label: item.title.rendered,
        href: wpUrlToPath(item.url),
        children: [],
      });
    }

    const roots: NavLink[] = [];
    for (const node of map.values()) {
      if (node._parent === 0) {
        roots.push(node);
      } else {
        map.get(node._parent)?.children?.push(node);
      }
    }

    return roots;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract featured image URL from an embedded post/page */
export function getFeaturedImageUrl(
  item: WPPost | WPPage,
  size = "full"
): string | null {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  return (
    media.media_details?.sizes?.[size]?.source_url ?? media.source_url ?? null
  );
}

/** Strip WP site URL prefix from a link to get a relative Next.js path */
export function wpUrlToPath(url: string): string {
  return url.replace(WP_URL, "") || "/";
}
