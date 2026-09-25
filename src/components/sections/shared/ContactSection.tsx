import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, site } from "@/content/site";
import type { ServiceOption } from "@/lib/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkedInIcon } from "@/components/ui/Icon";
import { LiveClock } from "@/components/ui/LiveClock";
import { Reveal } from "@/components/motion/Reveal";
import { Glow, GridBackdrop } from "@/components/effects/Backgrounds";

interface ContactSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  defaultService?: ServiceOption;
  headingLevel?: "h1" | "h2";
}

const details = [
  { icon: Phone, label: "Phone", value: site.contact.phone, href: site.contact.phoneHref },
  { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: MapPin, label: "Address", value: fullAddress },
  { icon: Clock, label: "Availability", value: "24/7 support · U.S. time zones aligned" },
];

export function ContactSection({
  eyebrow = "Contact Us",
  title = "Reach out to us anytime",
  description = "We’re always here to assist you! Whether you have questions, need support, or want to discuss your next project, feel free to reach out anytime.",
  defaultService,
  headingLevel = "h2",
}: ContactSectionProps) {
  const isPageHeading = headingLevel === "h1";
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <GridBackdrop className="opacity-50" />
      <Glow className="-top-40 -left-40 size-[36rem]" />
      <div className="relative container-page grid gap-12 lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="contact-title"
            as={headingLevel}
            intro={isPageHeading}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Reveal stagger={0.07} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {details.map(({ icon: IconComponent, label, value, href }) => {
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line-strong text-pulse transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                    <IconComponent className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
                      {label}
                    </span>
                    <span className="block font-medium break-words text-fg">{value}</span>
                  </span>
                </>
              );
              const cls =
                "group flex items-center gap-4 rounded-xl border border-line bg-panel/60 p-4 transition-colors hover:border-signal/40";
              return href ? (
                <a key={label} href={href} className={cls}>
                  {content}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {content}
                </div>
              );
            })}
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-line bg-panel/60 p-4 transition-colors hover:border-signal/40"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line-strong text-pulse transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                <LinkedInIcon className="size-5" />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
                  Stay Connected
                </span>
                <span className="block font-medium text-fg">Follow us on LinkedIn</span>
              </span>
            </a>
          </Reveal>
          <Reveal className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-[0.1em] text-fg-subtle uppercase">
            <span>
              New York <LiveClock timeZone="America/New_York" className="text-fg" />
            </span>
            <span>
              Chicago <LiveClock timeZone="America/Chicago" className="text-fg" />
            </span>
            <span>
              Los Angeles <LiveClock timeZone="America/Los_Angeles" className="text-fg" />
            </span>
          </Reveal>
        </div>

        <Reveal className="beam rounded-2xl p-6 glass sm:p-10" y={60}>
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-6">
            <div>
              {isPageHeading ? (
                <h2 className="text-2xl font-semibold text-fg">Tell us about your project</h2>
              ) : (
                <h3 className="text-2xl font-semibold text-fg">Tell us about your project</h3>
              )}
              <p className="mt-1 text-sm text-fg-muted">We’ll get back to you shortly.</p>
            </div>
            <span className="hidden font-mono text-[10px] tracking-[0.16em] text-ok uppercase sm:block">
              ● secure form
            </span>
          </div>
          <ContactForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
