/**
 * On-demand ISR revalidation endpoint
 *
 * WordPress can call this via a webhook (e.g. the "WP Webhooks" plugin or a
 * simple custom action hook) whenever you publish or update content.
 *
 * Example WordPress hook to add in functions.php or a plugin:
 *
 *   add_action('save_post', function($post_id) {
 *     $slug = get_post_field('post_name', $post_id);
 *     wp_remote_post('https://your-nextjs-site.com/api/revalidate', [
 *       'body' => json_encode([
 *         'secret' => 'your-secret-here',
 *         'slug'   => $slug,
 *         'type'   => get_post_type($post_id), // 'post' or 'page'
 *       ]),
 *       'headers' => ['Content-Type' => 'application/json'],
 *     ]);
 *   });
 *
 * Set REVALIDATION_SECRET in .env.local to match the secret above.
 */

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET;

  try {
    const body = await req.json();

    if (secret && body.secret !== secret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const { slug, type } = body as { slug?: string; type?: string };

    if (type === "page" && slug) {
      revalidatePath(`/${slug}`);
    } else if (type === "post" && slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/blog");
    } else {
      // Revalidate everything
      revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, slug, type });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
