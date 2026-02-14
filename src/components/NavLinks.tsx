"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/strapi";

interface NavLinksProps {
  lang: Locale;
  dict: {
    nav: { activities: string; services: string; links: string };
  };
}

export function NavLinks({ lang, dict }: NavLinksProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}/activities`, label: dict.nav.activities },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/links`, label: dict.nav.links },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium tracking-wide transition-colors ${
              isActive ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
            {...(isActive ? { "aria-current": "page" as const } : {})}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
