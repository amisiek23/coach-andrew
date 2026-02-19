import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { getNavLinks } from "@/lib/wordpress";
import type { NavLink } from "@/lib/types";

// Static fallback — used only when WP_AUTH_TOKEN is not set
const STATIC_NAV: NavLink[] = [
  { label: "Home",            href: "/" },
  { label: "About Me",        href: "/about" },
  { label: "Services",        href: "/services" },
  { label: "Shop",            href: "/shop" },
  { label: "Thinking Corner", href: "/blog" },
  { label: "Contact",         href: "/contact" },
];

const SERVICES_LINK: NavLink = { label: "Services", href: "/services" };

export default async function Header() {
  const dynamicNav = await getNavLinks();
  let links = (dynamicNav.length > 0 ? dynamicNav : STATIC_NAV)
    .filter((l) => l.href !== "/shop" && l.label !== "Shop");

  // Always ensure Services is in the nav, whether using dynamic or static links
  if (!links.some((l) => l.href === "/services")) {
    // Insert after "About Me" if present, otherwise after the first item
    const afterIndex = links.findIndex((l) => l.href === "/about" || l.label === "About Me");
    const insertAt = afterIndex >= 0 ? afterIndex + 1 : 1;
    links = [...links.slice(0, insertAt), SERVICES_LINK, ...links.slice(insertAt)];
  }

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#fff",
      borderBottom: "1px solid #e8f0e8",
      boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-heading), 'Libre Baskerville', Georgia, serif",
            fontSize: "1.45rem",
            fontWeight: 700,
            color: "#151716",
            letterSpacing: "-0.01em",
          }}>
            CoachAndrew
          </span>
        </Link>

        <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "2.25rem" }} className="hidden lg:flex">
          {links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              style={{ fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: ".9375rem", fontWeight: 500, color: "#377A00" }}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileMenu links={links} />
      </div>

      <style>{`.nav-link:hover { color: #2c6300 !important; }`}</style>
    </header>
  );
}
