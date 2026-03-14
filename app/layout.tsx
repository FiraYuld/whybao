import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://whybao.ru"),
  title: "WhyBao — Тренды из Китая для тебя",
  description:
    "Нишевые трендовые вещи из Китая: streetwear, casual с китайским вайбом. Why not Bao?",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="touch-manipulation">
      <body
        className={`${inter.variable} ${outfit.variable} min-h-screen w-full bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-screen min-w-0 flex-col max-w-full">
          <Navbar />
          <main className="min-w-0 flex-1 max-w-full overflow-x-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
