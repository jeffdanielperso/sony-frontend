"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/strapi";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BrandLogo } from "@/components/BrandLogo";
import { useAlternateUrl } from "@/components/AlternateUrlContext";

interface MobileNavProps {
  lang: Locale;
  dict: {
    nav: { home: string; activities: string; services: string; links: string; openMenu: string; closeMenu: string };
    language: { switchTo: string };
  };
}

export function MobileNav({ lang, dict }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { alternateUrl } = useAlternateUrl();

  const targetLocale = lang === "en" ? "fr" : "en";
  const langPath = alternateUrl ?? pathname.replace(`/${lang}`, `/${targetLocale}`);

  function handleClose() {
    setOpen(false);
    requestAnimationFrame(() => {
      openButtonRef.current?.focus();
    });
  }

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    document.body.style.overflow = "hidden";

    const closeBtn = dialog.querySelector<HTMLElement>("button");
    closeBtn?.focus();

    function getFocusableElements() {
      return dialog!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
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
        ref={openButtonRef}
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground"
        aria-label={dict.nav.openMenu}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && createPortal(
        <div
          ref={dialogRef}
          className="fixed inset-0 z-100 flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="flex items-center gap-3 font-heading text-xl font-medium tracking-[0.3em] uppercase text-foreground">
              <BrandLogo size={36} />
              Sony Yoga
            </span>
            <button
              onClick={handleClose}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground"
              aria-label={dict.nav.closeMenu}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-2">
            {navLinks.map((link) => {
              const isHome = link.href === `/${lang}`;
              const isCurrent = isHome ? pathname === link.href : (pathname === link.href || pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClose}
                  className="w-full max-w-xs py-4 text-center font-heading text-2xl font-light text-foreground transition-colors hover:text-accent"
                  {...(isCurrent ? { "aria-current": "page" as const } : {})}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-8 flex items-center gap-4">
              <Link
                href={langPath}
                onClick={handleClose}
                className="px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                hrefLang={targetLocale}
              >
                {dict.language.switchTo}
              </Link>
              <ThemeSwitcher />
            </div>
          </nav>
        </div>,
        document.body
      )}
    </div>
  );
}
