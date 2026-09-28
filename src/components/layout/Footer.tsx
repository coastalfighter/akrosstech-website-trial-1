import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav, serviceLinks } from "@/content/navigation";
import { fullAddress, site } from "@/content/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}) {
  return (
    <nav aria-label={title} className="flex flex-col gap-4">
      <h2 className="mono">{title}</h2>
      <ul className="flex flex-col gap-1.5 text-[14px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 opacity-75 transition-opacity hover:opacity-100"
            >
              <span className="link-line">{link.label}</span>
              {link.badge && <Badge>{link.badge}</Badge>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Studio footer: an oversized "GET IN TOUCH." call to action, link columns,
 * newsletter and a full-width wordmark. Extra bottom padding clears the
 * fixed status bar.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-paper pt-28 pb-14 text-ink md:pt-36">
      <div className="container-page">
        <div className="grid gap-10 pb-14 lg:grid-cols-[1fr_22rem] lg:items-end">
          <Link href="/contact" className="group w-fit">
            <span className="block h-display uppercase transition-colors duration-500 group-hover:text-moss-700">
              Get in touch
              <span className="text-lime transition-colors group-hover:text-ink">.</span>
            </span>
          </Link>
          <p className="max-w-sm text-[15px] leading-relaxed text-stone">
            {site.legalName} helps U.S. businesses scale with offshore talent and onshore quality —
            recruitment, virtual assistance, accounting, legal support and, now, websites.
          </p>
        </div>

        <div className="grid gap-12 border-t border-ink/12 py-12 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.3fr_1fr_1.3fr]">
          <ul className="flex flex-col text-[14px]">
            {[
              { label: "LinkedIn", href: site.social.linkedin },
              { label: "Email", href: `mailto:${site.contact.email}` },
              { label: "Call", href: site.contact.phoneHref },
            ].map((s) => (
              <li key={s.label} className="border-b border-ink/12 first:border-t">
                <a
                  href={s.href}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center justify-between py-2.5"
                >
                  {s.label}
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
          <Column title="Navigation" links={footerNav.quickLinks} />
          <Column title="Services" links={serviceLinks} />
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="mono">Contact</h2>
              <address className="flex flex-col gap-1.5 text-[14px] not-italic">
                <a href={`mailto:${site.contact.email}`} className="link-line w-fit">
                  {site.contact.email}
                </a>
                <a href={site.contact.phoneHref} className="link-line w-fit">
                  {site.contact.phone}
                </a>
                <span className="mt-2 max-w-[14rem] text-stone">{fullAddress}</span>
              </address>
            </div>
            <Column title="Legal" links={footerNav.help} />
          </div>
          <NewsletterForm />
        </div>
      </div>

      <Reveal y={60} className="container-page">
        <p
          className="flex items-start text-[21.5vw] leading-[0.8] font-medium tracking-[-0.075em] select-none 2xl:text-[21rem]"
          aria-hidden="true"
        >
          Akrostech
        </p>
      </Reveal>
    </footer>
  );
}
