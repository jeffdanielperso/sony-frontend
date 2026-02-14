"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/strapi";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

interface MobileNavProps {
  lang: Locale;
  dict: {
    nav: { home: string; activities: string; services: string; links: string };
    language: { switchTo: string; current: string };
  };
}

export function MobileNav({ lang, dict }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const targetLocale = lang === "en" ? "fr" : "en";
  const langPath = pathname.replace(`/${lang}`, `/${targetLocale}`);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open]);

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/activities`, label: dict.nav.activities },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/links`, label: dict.nav.links },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground"
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-heading text-xl font-light tracking-[0.3em] uppercase text-foreground">
              Sony Yoga
            </span>
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="w-full max-w-xs py-4 text-center font-heading text-2xl font-light text-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-8 flex items-center gap-4">
              <Link
                href={langPath}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                hrefLang={targetLocale}
              >
                {dict.language.switchTo}
              </Link>
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
