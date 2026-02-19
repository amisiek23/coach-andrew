import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Shop",
  description: "Coaching programmes and products from CoachAndrew.",
};

const WP_SHOP_URL = "https://wpstrona.wpmudev.host/coachandrew/shop/";

export default function ShopPage() {
  return (
    <div style={{ background: "#fff" }}>

      {/* Header */}
      <section style={{ background: "var(--green-pale)", padding: "4rem 0 3rem", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--green)", marginBottom: ".5rem" }}>
            Programmes &amp; Products
          </p>
          <h1 style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
            fontWeight: 700, color: "var(--text)", marginBottom: ".75rem",
          }}>
            Shop
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "460px", margin: "0 auto 2rem" }}>
            Coaching programmes, resources and tools to help you grow.
          </p>
          <a href={WP_SHOP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-green">
            Browse the Store
          </a>
        </div>
      </section>

    </div>
  );
}
