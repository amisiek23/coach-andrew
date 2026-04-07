import type { Metadata } from "next";
import { Libre_Baskerville, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const libreBaskervilleFont = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const openSansFont = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CoachAndrew",
    template: "%s | CoachAndrew",
  },
  description: "Elevate Your Game — Breath. Act. Grow.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    siteName: "CoachAndrew",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libreBaskervilleFont.variable} ${openSansFont.variable}`}>
      <body className="flex flex-col min-h-screen" style={{ background: "#fff", color: "#151716" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
