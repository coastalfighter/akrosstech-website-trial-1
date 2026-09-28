import { fullAddress, site } from "@/content/site";
import type { ServiceOption } from "@/lib/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

interface ContactSectionProps {
  label?: string;
  title?: string;
  description?: string;
  defaultService?: ServiceOption;
  headingLevel?: "h1" | "h2";
  tone?: "paper" | "ink";
}

export function ContactSection({
  label = "Contact Us",
  title = "Reach out to us *anytime*",
  description = "We’re always here to assist you! Whether you have questions, need support, or want to discuss your next project, feel free to reach out anytime.",
  defaultService,
  headingLevel = "h2",
  tone = "paper",
}: ContactSectionProps) {
  const isPage = headingLevel === "h1";
  const details = [
    { label: "Phone", value: site.contact.phone, href: site.contact.phoneHref },
    { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: "Address", value: fullAddress },
    { label: "Availability", value: "24/7 support · U.S. time zones" },
  ];
  return (
    <section
      id="contact"
      data-tone={tone}
      data-index-label="Contact"
      aria-labelledby="contact-title"
      className={isPage ? "pt-32 pb-28 md:pt-44" : "py-28 md:py-40"}
    >
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-12">
          <SectionHeading
            id="contact-title"
            as={headingLevel}
            intro={isPage}
            label={label}
            title={title}
            description={description}
            size={isPage ? "lg" : "md"}
          />
          <Reveal stagger={0.06} as="dl" className="border-t border-line">
            {details.map((d) => (
              <div
                key={d.label}
                className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4"
              >
                <dt className="pt-1 label text-muted">{d.label}</dt>
                <dd className="text-fg">
                  {d.href ? (
                    <a href={d.href} className="link-line">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
              <dt className="pt-1 label text-muted">Follow</dt>
              <dd>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-fg"
                >
                  LinkedIn ↗
                </a>
              </dd>
            </div>
          </Reveal>
        </div>
        <Reveal y={40}>
          <div className="border-t border-line pt-8">
            {isPage ? (
              <h2 className="font-serif text-3xl text-fg">Tell us about your project</h2>
            ) : (
              <h3 className="font-serif text-3xl text-fg">Tell us about your project</h3>
            )}
            <p className="mt-2 mb-10 text-sm text-muted">We’ll get back to you shortly.</p>
            <ContactForm defaultService={defaultService} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
