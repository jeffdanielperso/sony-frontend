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
    <div className="flex items-center gap-1 text-sm font-medium tracking-wide">
      <span className={lang === "en" ? "text-foreground" : "text-muted"}>
        EN
      </span>
      <span className="text-border">/</span>
      <span className={lang === "fr" ? "text-foreground" : "text-muted"}>
        FR
      </span>
      <Link
        href={newPath}
        className="ml-1 px-3 py-2 text-muted transition-colors hover:text-foreground"
        aria-label={`Switch language to ${label}`}
        hrefLang={targetLocale}
      >
        {label}
      </Link>
    </div>
  );
}
