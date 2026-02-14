import Link from "next/link";
import type { Locale } from "@/types/strapi";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { MobileNav } from "@/components/MobileNav";
import { BrandLogo } from "@/components/BrandLogo";
import { NavLinks } from "@/components/NavLinks";

interface HeaderProps {
  lang: Locale;
  dict: {
    nav: { home: string; activities: string; services: string; links: string; openMenu: string; closeMenu: string };
    language: { switchTo: string };
  };
}

export function Header({ lang, dict }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-linear-to-r after:from-transparent after:via-border after:to-transparent">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href={`/${lang}`}
          className="flex items-center gap-3 font-heading text-xl font-medium tracking-[0.3em] uppercase text-foreground"
        >
          <BrandLogo size={36} />
          Sony Yoga
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLinks lang={lang} dict={dict} />
          <ThemeSwitcher />
          <LanguageSwitcher lang={lang} label={dict.language.switchTo} />
        </div>

        <MobileNav lang={lang} dict={dict} />
      </nav>
    </header>
  );
}
