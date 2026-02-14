import Link from "next/link";
import type { Locale } from "@/types/strapi";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  lang: Locale;
  dict: {
    nav: { home: string; activities: string; services: string; links: string };
    language: { switchTo: string };
  };
}

export function Header({ lang, dict }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href={`/${lang}`}
          className="text-xl font-light tracking-widest uppercase text-foreground"
        >
          Sony Yoga
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href={`/${lang}/activities`}
            className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-foreground"
          >
            {dict.nav.activities}
          </Link>
          <Link
            href={`/${lang}/services`}
            className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-foreground"
          >
            {dict.nav.services}
          </Link>
          <Link
            href={`/${lang}/links`}
            className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-foreground"
          >
            {dict.nav.links}
          </Link>
          <LanguageSwitcher lang={lang} label={dict.language.switchTo} />
        </div>
      </nav>
    </header>
  );
}
