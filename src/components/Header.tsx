import Link from "next/link";
import type { Locale } from "@/types/strapi";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { MobileNav } from "@/components/MobileNav";

interface HeaderProps {
  lang: Locale;
  dict: {
    nav: { home: string; activities: string; services: string; links: string };
    language: { switchTo: string; current: string };
  };
}

export function Header({ lang, dict }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:via-border after:to-transparent">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href={`/${lang}`}
          className="font-heading text-xl font-light tracking-[0.3em] uppercase text-foreground"
        >
          Sony Yoga
        </Link>

        <div className="hidden items-center gap-8 md:flex">
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
          <ThemeSwitcher />
          <LanguageSwitcher lang={lang} label={dict.language.switchTo} />
        </div>

        <MobileNav lang={lang} dict={dict} />
      </nav>
    </header>
  );
}
