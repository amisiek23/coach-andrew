import Link from "next/link";
import Image from "next/image";
import type { WPPost } from "@/lib/types";
import { getFeaturedImageUrl } from "@/lib/wordpress";

interface Props { post: WPPost }

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function PostCard({ post }: Props) {
  const imageUrl = getFeaturedImageUrl(post, "medium_large");
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
  const excerpt  = stripHtml(post.excerpt.rendered).slice(0, 140);
  const date     = new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <article style={{
      background: "#fff",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "box-shadow .25s, transform .25s",
    }}
      className="post-card"
    >
      {/* Image */}
      <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" style={{ display: "block", overflow: "hidden", aspectRatio: "16/9" }}>
        {imageUrl
          ? <Image src={imageUrl} alt={imageAlt} width={600} height={338}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease" }}
              className="card-img" />
          : <div style={{ width: "100%", height: "100%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "var(--green)", fontSize: "2rem" }}>🌿</span>
            </div>
        }
      </Link>

      {/* Body */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1, gap: ".75rem" }}>
        <time dateTime={post.date} style={{ fontSize: ".75rem", fontWeight: 600, color: "var(--green)", letterSpacing: ".08em", textTransform: "uppercase" }}>
          {date}
        </time>

        <h2 style={{ fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, lineHeight: 1.3, color: "var(--text)", flex: 1 }}>
          <Link href={`/blog/${post.slug}`} style={{ color: "inherit" }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </h2>

        {excerpt && (
          <p style={{ fontSize: ".875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{excerpt}</p>
        )}

        <Link href={`/blog/${post.slug}`} style={{
          display: "inline-flex", alignItems: "center", gap: ".35rem",
          fontSize: ".8125rem", fontWeight: 600, color: "var(--green)",
          letterSpacing: ".04em",
          marginTop: ".25rem",
        }}>
          Read article
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <style>{`
        .post-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-3px); }
        .post-card:hover .card-img { transform: scale(1.04); }
      `}</style>
    </article>
  );
}
