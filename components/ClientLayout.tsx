"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const IMMERSIVE_ROUTES = ["/self-mastery-profile/quiz"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isImmersive = IMMERSIVE_ROUTES.some((r) => pathname?.startsWith(r));

  return (
    <>
      {!isImmersive && <Header />}
      <main className="flex-1">{children}</main>
      {!isImmersive && <Footer />}
    </>
  );
}
