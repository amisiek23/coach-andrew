// ---------------------------------------------------------------------------
// WordPress REST API – TypeScript interfaces
// ---------------------------------------------------------------------------

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<
      string,
      { source_url: string; width: number; height: number }
    >;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_urls: Record<string, string>;
}

export interface WPPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPCategory[][];
    author?: WPAuthor[];
  };
}

export interface WPPage {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  parent: number;
  menu_order: number;
  template: string;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
}

export interface WPMenuItem {
  id: number;
  title: WPRendered;
  url: string;
  parent: number;
  menu_order: number;
  type: string;
  object: string;
  object_id: number;
}

// Normalised nav link used in components
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface WPSiteInfo {
  name: string;
  description: string;
  url: string;
  home: string;
}
