import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { collaborate } from "@/content/home";
import { fullAddress, site } from "@/content/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { LinkedInIcon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Magnetic } from "@/components/motion/Magnetic";
import { TextReveal } from "@/components/motion/TextReveal";
import { GradientMesh } from "@/components/effects/Backgrounds";
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
      <h2 className="text-fg mb-5 font-sans text-sm font-semibold">{title}</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group text-fg-muted inline-flex items-center gap-2 text-sm transition-colors hover:text-lime-500"
            >
              <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-lime-500 after:transition-transform after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-100">
                {link.label}
              </span>
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
    <footer className="border-line bg-ink-900 relative overflow-hidden border-t">
      <GradientMesh className="opacity-30" />

      {/* Let's work together */}
      <div className="container-page relative pt-24 pb-16 sm:pt-32">
        <p className="font-display mb-6 text-xs tracking-[0.3em] text-lime-500 uppercase">
          {collaborate.eyebrow}
        </p>
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <TextReveal
            as="h2"
            split="chars"
            className="font-display text-fg text-[clamp(3rem,1.5rem+7vw,8.5rem)] leading-[0.9] font-medium tracking-tight uppercase"
          >
            {collaborate.heading}
          </TextReveal>
          <Magnetic strength={0.35}>
            <Link
              href="/contact"
              data-cursor-label="Let's talk"
              className="group text-ink-950 grid size-36 place-items-center rounded-full bg-lime-500 text-center text-sm font-bold transition-transform duration-500 hover:scale-105 sm:size-44"
            >
              <span className="flex flex-col items-center gap-1">
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

      <div className="container-page relative">
        <div className="border-line grid gap-12 border-t py-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link href="/" aria-label="Akrostech — home" className="w-fit">
              <Logo />
            </Link>
            <p className="text-fg-muted max-w-sm text-sm leading-relaxed">{collaborate.tagline}</p>
            <NewsletterForm className="max-w-sm" />
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-span-5 lg:grid-cols-[0.8fr_1.5fr_1fr]">
            <FooterColumn title="Quick Link" links={footerNav.quickLinks} />
            <FooterColumn title="Services" links={footerNav.services} />
            <FooterColumn title="Help" links={footerNav.help} />
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-fg mb-5 font-sans text-sm font-semibold">Contact</h2>
            <address className="text-fg-muted flex flex-col gap-4 text-sm not-italic">
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-3 transition-colors hover:text-lime-500"
              >
                <Phone className="size-4 text-lime-500" aria-hidden="true" />
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-3 break-all transition-colors hover:text-lime-500"
              >
                <Mail className="size-4 shrink-0 text-lime-500" aria-hidden="true" />
                {site.contact.email}
              </a>
              <span className="inline-flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-lime-500" aria-hidden="true" />
                {fullAddress}
              </span>
            </address>
            <p className="text-fg mt-8 mb-3 text-sm font-semibold">Follow on:</p>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Akrostech on LinkedIn (opens in a new tab)"
              className="border-line-strong text-fg-muted hover:text-ink-950 grid size-11 place-items-center rounded-full border transition-colors hover:border-lime-500 hover:bg-lime-500"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="border-line text-fg-subtle flex flex-col gap-3 border-t py-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {year} {site.legalName}. All Rights Reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-[3vw] overflow-hidden select-none"
      >
        <p className="font-display text-center text-[18.5vw] leading-[0.8] font-semibold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
          AKROSTECH
        </p>
      </div>
    </footer>
  );
}
