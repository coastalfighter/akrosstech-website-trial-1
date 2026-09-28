import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { collaborate } from "@/content/home";
import { fullAddress, site } from "@/content/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CircleLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { TextReveal } from "@/components/motion/TextReveal";
import { Wordmark } from "./Wordmark";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-5 label text-muted">( {title} )</h2>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="group inline-flex items-center gap-2 text-[15px]">
              <span className="link-line">{link.label}</span>
              {link.badge && <Badge className="!text-[9px]">{link.badge}</Badge>}
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
    <footer className="relative overflow-hidden" data-tone="ink">
      {/* Closing statement */}
      <div className="container-page flex flex-col gap-12 pt-32 pb-20 md:pt-44 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-8">
          <Label>{collaborate.eyebrow}</Label>
          <TextReveal as="h2" split="words" className="max-w-5xl display-xl text-fg">
            Let’s work <em className="italic">together</em>
          </TextReveal>
          <p className="max-w-md text-lg leading-relaxed text-muted">{collaborate.tagline}</p>
        </div>
        <CircleLink href="/contact" label={collaborate.cta} />
      </div>

      <div className="container-page">
        <div className="grid gap-12 border-t border-line py-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <address className="flex flex-col gap-2 not-italic">
              <span className="mb-3 label text-muted">( Contact )</span>
              <a href={site.contact.phoneHref} className="link-line w-fit font-serif text-3xl">
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="link-line w-fit font-serif text-3xl italic"
              >
                {site.contact.email}
              </a>
              <span className="mt-3 max-w-xs text-sm text-muted">{fullAddress}</span>
            </address>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            <FooterColumn title="Quick Link" links={footerNav.quickLinks} />
            <FooterColumn title="Services" links={footerNav.services} />
            <div className="flex flex-col gap-10">
              <FooterColumn title="Help" links={footerNav.help} />
              <FooterColumn
                title="Follow on"
                links={[{ label: "LinkedIn ↗", href: site.social.linkedin }]}
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 label text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <p>{site.tagline}</p>
          <p>All Rights Reserved</p>
        </div>
      </div>

      <Wordmark className="px-2 pb-2 text-fg md:px-4" />
    </footer>
  );
}
