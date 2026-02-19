# CoachAndrew – Next.js Headless WordPress Frontend

WordPress stays as the CMS backend. Next.js handles the frontend via the WordPress REST API.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.local.example .env.local
# Edit .env.local — the default WP URL is already filled in

# 3. Run the dev server
npm run dev
# → http://localhost:3000
```

## Architecture

```
WordPress (CMS)                Next.js (frontend)
─────────────────              ───────────────────────────────────────
Posts / Pages      ──REST──►  app/blog/[slug]/page.tsx
Media library      ──REST──►  next/image (remote patterns)
Front page (ID:9)  ──REST──►  app/page.tsx
Dynamic pages      ──REST──►  app/[slug]/page.tsx
SureCart products  ──REST──►  app/shop/  (handled via /shop WP page)
Menus (auth)       ──REST──►  components/Header.tsx (static fallback)
```

### ISR (Incremental Static Regeneration)
Pages revalidate every **60 seconds**. You can also trigger instant revalidation
from WordPress on publish/update using the `/api/revalidate` endpoint.

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_WP_URL` | `https://wpstrona.wpmudev.host/coachandrew` | WP site root |
| `WP_AUTH_TOKEN` | – | `username:app_password` for authenticated endpoints |
| `REVALIDATION_SECRET` | – | Secret for the `/api/revalidate` webhook |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public URL (for OG metadata) |

## Unlocking authenticated menus

The `/wp-json/wp/v2/menus` endpoint requires authentication.
To use dynamic menus instead of the static fallback in `components/Header.tsx`:

1. Go to **WP Admin → Users → Profile → Application Passwords**
2. Create a new password, copy `username:generated_password`
3. Add it as `WP_AUTH_TOKEN=username:generated_password` in `.env.local`
4. Update `lib/wordpress.ts` to call `/wp-json/wp/v2/menu-items` and pass it to `<Header>`

## On-demand revalidation from WordPress

Add this to your theme's `functions.php` or a custom plugin:

```php
add_action('save_post', function($post_id) {
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) return;
    $slug = get_post_field('post_name', $post_id);
    $type = get_post_type($post_id);
    wp_remote_post('https://your-nextjs-site.com/api/revalidate', [
        'body'    => json_encode(['secret' => 'your-secret-here', 'slug' => $slug, 'type' => $type]),
        'headers' => ['Content-Type' => 'application/json'],
    ]);
});
```

## Project structure

```
.
├── app/
│   ├── layout.tsx              # Root layout (Header + Footer)
│   ├── page.tsx                # Homepage (WP front page ID 9)
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Brand styles + wp-content reset
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Individual post
│   ├── [slug]/page.tsx         # Any WP page (questionnaire, shop, etc.)
│   └── api/revalidate/route.ts # On-demand ISR webhook
├── components/
│   ├── Header.tsx              # Site header + desktop nav
│   ├── MobileMenu.tsx          # Client-side hamburger menu
│   ├── Footer.tsx              # Site footer
│   ├── PostCard.tsx            # Blog post card
│   └── WpContent.tsx           # Renders WP HTML content
├── lib/
│   ├── wordpress.ts            # All WP REST API fetch functions
│   └── types.ts                # TypeScript interfaces
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Deployment

Works on any platform that supports Next.js 15:
- **Vercel** (recommended – zero config, automatic ISR)
- **Netlify**
- **Self-hosted** with `npm run build && npm start`
