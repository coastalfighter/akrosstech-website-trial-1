import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, site } from "@/content/site";
import type { ServiceOption } from "@/lib/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkedInIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { GradientMesh } from "@/components/effects/Backgrounds";

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
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <GradientMesh className="opacity-40" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="contact-title"
            as={headingLevel}
            intro={headingLevel === "h1"}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {details.map(({ icon: IconComponent, label, value, href }) => {
              const content = (
                <>
                  <span className="group-hover:text-ink-950 grid size-12 shrink-0 place-items-center rounded-2xl bg-lime-500/10 text-lime-500 transition-colors group-hover:bg-lime-500">
                    <IconComponent className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="text-fg-subtle block text-xs tracking-wide uppercase">
                      {label}
                    </span>
                    <span className="text-fg block font-medium break-words">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  className="group border-line flex items-center gap-4 rounded-2xl border bg-white/[0.02] p-4 transition-colors hover:border-lime-500/40"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={label}
                  className="group border-line flex items-center gap-4 rounded-2xl border bg-white/[0.02] p-4"
                >
                  {content}
                </div>
              );
            })}
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-line flex items-center gap-4 rounded-2xl border bg-white/[0.02] p-4 transition-colors hover:border-lime-500/40"
            >
              <span className="group-hover:text-ink-950 grid size-12 shrink-0 place-items-center rounded-2xl bg-lime-500/10 text-lime-500 transition-colors group-hover:bg-lime-500">
                <LinkedInIcon className="size-5" />
              </span>
              <span>
                <span className="text-fg-subtle block text-xs tracking-wide uppercase">
                  Stay Connected
                </span>
                <span className="text-fg block font-medium">Follow us on LinkedIn</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal className="glass rounded-[2rem] p-6 sm:p-10" y={60}>
          {headingLevel === "h1" ? (
            <h2 className="text-fg mb-2 text-2xl font-medium">Tell us about your project</h2>
          ) : (
            <h3 className="text-fg mb-2 text-2xl font-medium">Tell us about your project</h3>
          )}
          <p className="text-fg-muted mb-8 text-sm">We’ll get back to you shortly.</p>
          <ContactForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
