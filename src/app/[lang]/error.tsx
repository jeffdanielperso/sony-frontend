"use client";

import { useParams } from "next/navigation";
import type { Locale } from "@/types/strapi";
import en from "@/i18n/dictionaries/en.json";
import fr from "@/i18n/dictionaries/fr.json";

const dicts = { en, fr } as const;

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ lang: Locale }>();
  const lang = params.lang ?? "en";
  const dict = dicts[lang] ?? dicts.en;

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-heading text-4xl font-light tracking-tight text-foreground sm:text-5xl">
        {dict.error.title}
      </h1>
      <p className="mt-4 text-lg text-muted">
        {dict.error.message}
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-full border border-accent bg-accent/10 px-8 py-3 text-sm font-medium tracking-wide text-accent transition-colors hover:bg-accent hover:text-white"
      >
        {dict.error.retry}
      </button>
    </section>
  );
}
