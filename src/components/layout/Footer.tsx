import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { collaborate } from "@/content/home";
import { fullAddress, site } from "@/content/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { LinkedInIcon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { Magnetic } from "@/components/motion/Magnetic";
import { TextReveal } from "@/components/motion/TextReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Logo } from "./Logo";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-5 font-mono text-[11px] font-medium tracking-[0.18em] text-fg-subtle uppercase">
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-white"
            >
              <span
                className="h-px w-0 bg-pulse transition-all duration-300 group-hover:w-3"
                aria-hidden="true"
              />
              {link.label}
              {link.badge && <Badge className="px-1.5 py-0 text-[9px]">{link.badge}</Badge>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-void">
      {/* Let's work together — photo-backed CTA band */}
      <div className="relative isolate overflow-hidden border-b border-line">
        <Parallax speed={0.3} className="absolute inset-x-0 -top-1/4 -bottom-1/4 -z-10">
          <Photo name="handshake" baked className="size-full" sizes="100vw" />
        </Parallax>
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/85 to-void/40"
          aria-hidden="true"
        />
        <div className="container-page flex flex-col items-start justify-between gap-10 py-24 sm:py-32 lg:flex-row lg:items-end">
          <div>
            <p className="mb-6 font-mono text-xs tracking-[0.2em] text-pulse uppercase">
              {"// "}
              {collaborate.eyebrow}
            </p>
            <TextReveal
              as="h2"
              split="chars"
              className="font-display text-[clamp(3rem,1.2rem+7vw,8rem)] leading-[0.9] font-bold tracking-tighter text-fg uppercase"
            >
              {collaborate.heading}
            </TextReveal>
          </div>
          <Magnetic strength={0.3}>
            <Link
              href="/contact"
              data-cursor-label="Let's talk"
              className="beam group relative grid size-40 place-items-center rounded-full bg-signal text-center text-sm font-semibold text-white shadow-[0_20px_80px_-20px_rgba(61,123,255,0.9)] transition-transform duration-500 hover:scale-105 sm:size-44"
            >
              <span className="flex flex-col items-center gap-1.5">
                <ArrowUpRight
                  className="size-7 transition-transform duration-500 group-hover:rotate-45"
                  aria-hidden="true"
                />
                {collaborate.cta}
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="relative container-page">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link href="/" aria-label="Akrostech — home" className="w-fit">
              <Logo />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-fg-muted">{collaborate.tagline}</p>
            <NewsletterForm className="max-w-sm" />
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-span-5 lg:grid-cols-[0.8fr_1.5fr_1fr]">
            <FooterColumn title="Quick Link" links={footerNav.quickLinks} />
            <FooterColumn title="Services" links={footerNav.services} />
            <FooterColumn title="Help" links={footerNav.help} />
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-5 font-mono text-[11px] font-medium tracking-[0.18em] text-fg-subtle uppercase">
              Contact
            </h2>
            <address className="flex flex-col gap-4 text-sm text-fg-muted not-italic">
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-pulse" aria-hidden="true" />
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-3 break-all transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-pulse" aria-hidden="true" />
                {site.contact.email}
              </a>
              <span className="inline-flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-pulse" aria-hidden="true" />
                {fullAddress}
              </span>
            </address>
            <p className="mt-8 mb-3 font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">
              Follow on:
            </p>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Akrostech on LinkedIn (opens in a new tab)"
              className="grid size-11 place-items-center rounded-lg border border-line-strong text-fg-muted transition-colors hover:border-signal hover:bg-signal hover:text-white"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-8 font-mono text-[11px] tracking-[0.08em] text-fg-subtle uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All Rights Reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-[2.5vw] overflow-hidden select-none"
      >
        <p className="bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-center font-display text-[17vw] leading-[0.8] font-bold tracking-tighter text-transparent">
          AKROSTECH
        </p>
      </div>
    </footer>
  );
}
