import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPage, getPages, getFeaturedImageUrl } from "@/lib/wordpress";
import WpContent from "@/components/WpContent";

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Page not found" };

  const image = getFeaturedImageUrl(page, "large");
  const description = page.excerpt.rendered.replace(/<[^>]*>/g, "").trim().slice(0, 160);

  return {
    title: page.title.rendered,
    description: description || undefined,
    openGraph: {
      title: page.title.rendered,
      description: description || undefined,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const imageUrl = getFeaturedImageUrl(page, "full");
  const imageAlt =
    page._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || page.title.rendered;

  return (
    <div style={{ background: "#fff" }}>

      {/* ── Page hero banner ── */}
      <section style={{
        background: imageUrl ? "transparent" : "var(--green-pale)",
        position: "relative",
        minHeight: imageUrl ? "260px" : "auto",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}>
        {imageUrl && (
          <>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.65) 0%, rgba(0,0,0,.2) 100%)" }} />
          </>
        )}

        <div className="container" style={{
          position: "relative", zIndex: 2,
          padding: imageUrl ? "2.5rem clamp(1.25rem,5vw,3rem)" : "3rem clamp(1.25rem,5vw,3rem) 2rem",
        }}>
          {/* Breadcrumb */}
          <Link href="/" style={{ fontSize: ".8125rem", color: imageUrl ? "rgba(255,255,255,.8)" : "var(--green)", display: "inline-flex", alignItems: "center", gap: ".3rem", marginBottom: "1rem" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Home
          </Link>

          <h1 style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: imageUrl ? "#fff" : "var(--text)",
            lineHeight: 1.15,
          }}
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
        </div>
      </section>

      {/* ── Page content ── */}
      <section style={{ padding: "3.5rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <WpContent html={page.content.rendered} />
        </div>
      </section>

    </div>
  );
}
