"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-heading text-4xl font-light tracking-tight text-foreground sm:text-5xl">
        Something Went Wrong
      </h1>
      <p className="mt-4 text-lg text-muted">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-accent bg-accent/10 px-8 py-3 text-sm font-medium tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
      >
        Try Again
      </button>
    </section>
  );
}
