import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/config";
import type { Locale } from "@/types/strapi";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: {
      default: dict.site.title,
      template: `%s | ${dict.site.title}`,
    },
    description: dict.site.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header lang={lang} dict={dict} />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
