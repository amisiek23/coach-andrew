import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-heading text-primary font-bold">404</p>
      <h1 className="text-2xl font-heading text-brand-text mt-4 mb-2">Page not found</h1>
      <p className="text-brand-text/60 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-3 bg-primary text-white rounded-cta uppercase tracking-wider text-sm font-semibold hover:bg-primary-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
