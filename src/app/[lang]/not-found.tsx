import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-heading text-5xl font-light tracking-tight text-foreground sm:text-6xl">
        404
      </h1>
      <p className="mt-4 text-lg text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/en"
        className="mt-8 inline-flex min-h-11 items-center rounded-full border border-accent bg-accent/10 px-8 py-3 text-sm font-medium tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
      >
        Return Home
      </Link>
    </section>
  );
}
