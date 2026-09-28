import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";
import { organizationJsonLd, serializeJsonLd } from "@/lib/seo";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader, preloaderScript } from "@/components/effects/Preloader";
import { PageTransition } from "@/components/effects/PageTransition";
import { BottomBar } from "@/components/layout/BottomBar";
import { MotionController } from "@/components/motion/MotionController";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "IT outsourcing",
    "website development",
    "web design agency",
    "recruitment process outsourcing",
    "virtual assistant services",
    "outsourced accounting",
    "legal process outsourcing",
    "offshore team",
    "Next.js development",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      data-header="light"
      data-bar="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Decide preloader visibility before first paint (no flash on repeat visits). */}
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
        <noscript>
          <style>{`.preloader{display:none!important}.hero-word,.hero-fade{opacity:1!important;transform:none!important}[data-orbit-item]{visibility:visible!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd()) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[110] -translate-y-20 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <MotionProvider>
          <SmoothScroll>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <BottomBar />
            <MotionController />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
