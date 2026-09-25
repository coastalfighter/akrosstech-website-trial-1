import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy.
 * - `unsafe-inline` for scripts is required by Next.js' inline bootstrap
 *   scripts (and our no-flash preloader script) unless nonces are used.
 * - `unsafe-eval` is only allowed in development (React Refresh).
 * - vercel.live is allowed so the Vercel preview toolbar works without
 *   console errors on preview deployments.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://vercel.live${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  `connect-src 'self' https://vercel.live wss://ws-us3.pusher.com${isDev ? " ws: wss:" : ""}`,
  "frame-src https://vercel.live",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** Old WordPress URLs → new routes (301) so existing rankings and links survive. */
const legacyBlogSlugs = [
  "what-is-recruitment-process-outsourcing-rpo",
  "hr-outsourcing-services-vs-rpo-whats-best-for-your-business",
  "what-is-a-virtual-assistant-va-benefits-services-how-to-hire-one",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/about-akrostech", destination: "/about", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/blog-akrostech", destination: "/blog", permanent: true },
      { source: "/feed", destination: "/blog", permanent: true },
      ...legacyBlogSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
