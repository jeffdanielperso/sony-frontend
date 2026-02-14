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
      className="flex items-center gap-1 text-sm font-medium tracking-wide"
      aria-label={`Switch language to ${label}`}
      hrefLang={targetLocale}
    >
      <span className={lang === "en" ? "text-foreground" : "text-muted transition-colors hover:text-foreground"}>
        EN
      </span>
      <span className="text-border">/</span>
      <span className={lang === "fr" ? "text-foreground" : "text-muted transition-colors hover:text-foreground"}>
        FR
      </span>
    </Link>
  );
}
