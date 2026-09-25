import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { site } from "@/content/site";
import { organizationJsonLd, serializeJsonLd } from "@/lib/seo";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader, preloaderScript } from "@/components/effects/Preloader";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { PageTransition } from "@/components/effects/PageTransition";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { NoiseOverlay } from "@/components/effects/Backgrounds";
import { MotionController } from "@/components/motion/MotionController";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
  // Used for small labels only — not needed for first contentful paint.
  preload: false,
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
  themeColor: "#030509",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${mono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Decide preloader visibility before first paint (no flash on repeat visits). */}
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
        <noscript>
          <style>{`.preloader{display:none!important}.hero-word,.hero-fade{opacity:1!important;transform:none!important}.type-line{width:auto!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd()) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[110] -translate-y-20 rounded-lg bg-signal px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <MotionProvider>
          <SmoothScroll>
            <ScrollProgress />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <MotionController />
          </SmoothScroll>
        </MotionProvider>
        <CustomCursor />
        <NoiseOverlay />
      </body>
    </html>
  );
}
