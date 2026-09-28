import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav, serviceLinks } from "@/content/navigation";
import { fullAddress, site } from "@/content/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/motion/Reveal";
import { LogoMark } from "./Logo";
import { BackToTop } from "./BackToTop";

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-5">
      <h2 className="text-lg font-medium uppercase">{title}</h2>
      <ul className="flex flex-col gap-1 text-lg">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-ink/70 transition-colors hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Studio footer (juncastudio-style): an oversized "GET IN TOUCH." with the
 * company blurb, social rows and link columns, then the logo lockup, legal
 * line and "back to top". Bottom padding clears the fixed status bar.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative pt-32 pb-20 text-ink md:pt-44">
      <div className="container-page">
        <Reveal
          y={30}
          className="grid gap-10 border-b border-ink/12 pb-14 lg:grid-cols-[1fr_24rem] lg:items-center"
        >
          <Link href="/contact" className="group w-fit">
            <span className="block h-display uppercase">
              Get in touch
              <span className="inline-block text-lime transition-transform duration-500 group-hover:translate-x-2">
                .
              </span>
            </span>
          </Link>
          <p className="max-w-sm text-lg leading-[1.3]">
            Akrostech is an offshore talent and web studio for ambitious U.S. businesses. We build
            dedicated remote teams — recruitment, virtual assistance, accounting and legal support —
            and the websites that help you grow.
          </p>
        </Reveal>

        <div className="grid gap-14 py-14 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          <ul className="flex flex-col text-base lg:max-w-60">
            {[
              { label: "LinkedIn", href: site.social.linkedin },
              { label: "Email", href: `mailto:${site.contact.email}` },
              { label: "Call", href: site.contact.phoneHref },
            ].map((s) => (
              <li key={s.label} className="border-b border-ink/15 first:border-t">
                <a
                  href={s.href}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center justify-between py-2"
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

          <div className="flex flex-col gap-12">
            <Column title="Navigation" links={footerNav.quickLinks} />
            <Column title="Our services" links={serviceLinks} />
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-medium uppercase">Contact</h2>
              <address className="flex flex-col gap-1 text-lg not-italic">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="w-fit text-ink/70 transition-colors hover:text-ink"
                >
                  {site.contact.email}
                </a>
                <a
                  href={site.contact.phoneHref}
                  className="w-fit text-ink/70 transition-colors hover:text-ink"
                >
                  {site.contact.phone}
                </a>
                <span className="mt-2 max-w-[16rem] text-base text-stone">{fullAddress}</span>
              </address>
            </div>
            <NewsletterForm />
          </div>

          <Column title="Legal" links={footerNav.help} />
        </div>

        <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-end md:justify-between">
          <Link href="/" aria-label="Akrostech — home" className="inline-flex items-center gap-3">
            <span
              className="grid size-11 place-items-center rounded-[8px] bg-ink"
              aria-hidden="true"
            >
              <LogoMark className="w-7 text-lime" />
            </span>
            <span className="font-display text-[2.6rem] leading-none font-medium tracking-[-0.04em]">
              Akrostech
            </span>
          </Link>
          <p className="text-base text-ink/70">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
