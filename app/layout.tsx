import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { CookieConsent } from "@/components/cookie-consent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whybao.ru";
const siteName = "WhyBao";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WhyBao - Тренды из Китая для тебя",
    template: "%s | WhyBao",
  },
  description:
    "WhyBao — байер-сервис: нишевые трендовые вещи из Китая, streetwear и casual. Бесплатная доставка в Россию. Why not Bao?",
  keywords: ["WhyBao", "байер", "Китай", "одежда из Китая", "streetwear", "доставка из Китая"],
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName,
    title: "WhyBao - Тренды из Китая для тебя",
    description: "Байер-сервис WhyBao: трендовая одежда из Китая с бесплатной доставкой в РФ.",
    images: [{ url: "/logo.webp", width: 512, height: 512, alt: "WhyBao" }],
  },
  twitter: {
    card: "summary",
    title: "WhyBao - Тренды из Китая для тебя",
    description: "Байер-сервис WhyBao: одежда из Китая, доставка в Россию.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WhyBao",
  url: siteUrl,
  logo: `${siteUrl}/logo.webp`,
  description: "Байер-сервис WhyBao: трендовая одежда из Китая с бесплатной доставкой в Россию.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="touch-manipulation">
      <head>
        <link rel="preload" href="/hero/hero_1.webp" as="image" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} min-h-screen w-full bg-background text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <YandexMetrika />
        <CookieConsent />
        <div className="flex min-h-screen min-w-0 flex-col max-w-full">
          <Navbar />
          <main className="min-w-0 flex-1 max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
