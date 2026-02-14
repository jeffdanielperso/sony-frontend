import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/strapi";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlternateUrlProvider } from "@/components/AlternateUrlContext";

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

function isValidLocale(lang: string): lang is Locale {
  return (locales as readonly string[]).includes(lang);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return { title: "Not Found" };
  const dict = await getDictionary(lang);
  return {
    title: {
      default: dict.site.title,
      template: `%s | ${dict.site.title}`,
    },
    description: dict.site.description,
  };
}

const themeScript = `
(function(){
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch(e) {}
})();
`;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${heading.variable} ${body.variable} font-sans antialiased bg-background text-foreground`}
      >
        <AlternateUrlProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Header lang={lang} dict={dict} />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer lang={lang} dict={dict} />
        </AlternateUrlProvider>
      </body>
    </html>
  );
}
