"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/strapi";

interface LanguageSwitcherProps {
  lang: Locale;
  label: string;
}

export function LanguageSwitcher({ lang, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const targetLocale = lang === "en" ? "fr" : "en";
  const newPath = pathname.replace(`/${lang}`, `/${targetLocale}`);

  return (
    <Link
      href={newPath}
      className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-foreground"
      aria-label={`Switch language to ${label}`}
    >
      {label}
    </Link>
  );
}
