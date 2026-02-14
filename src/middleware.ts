import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/types/strapi";

const locales: Locale[] = ["en", "fr"];
const defaultLocale: Locale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (hasLocale) return NextResponse.next();

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language");
  let detectedLocale = defaultLocale;

  if (acceptLanguage) {
    const preferred = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
    if (locales.includes(preferred as typeof detectedLocale)) {
      detectedLocale = preferred as typeof detectedLocale;
    }
  }

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|favicon.png|.*\\..*).*)"],
};
