import { collaborate } from "@/content/home";
import { fullAddress, site } from "@/content/site";
import type { ServiceOption } from "@/lib/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const details = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Phone", value: site.contact.phone, href: site.contact.phoneHref },
  { label: "Address", value: fullAddress },
  { label: "Availability", value: "24/7 support · U.S. time zones" },
  { label: "Follow", value: "LinkedIn ↗", href: site.social.linkedin },
];

/**
 * Contact block: ink section with details on the left and the enquiry form
 * on a paper card. `asPage` renders the title as the page's h1 with a CSS
 * intro (for /contact).
 */
export function ContactPanel({
  asPage = false,
  title = "Let’s build *your team.*",
  description = collaborate.tagline,
  defaultService,
}: {
  asPage?: boolean;
  title?: string;
  description?: string;
  defaultService?: ServiceOption;
}) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-ink pt-32 pb-24 text-paper md:pt-40 md:pb-32"
      data-theme="dark"
    >
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-12">
          <SectionHeading
            id="contact-title"
            as={asPage ? "h1" : "h2"}
            intro={asPage}
            eyebrow="Contact"
            title={title}
            description={description}
            size="xl"
          />
          <Reveal as="dl" stagger={0.06} className="flex flex-col border-t border-paper/12">
            {details.map((d) => (
              <div
                key={d.label}
                className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-paper/12 py-3.5 text-[14px]"
              >
                <dt className="mono text-fog">{d.label}</dt>
                <dd>
                  {d.href ? (
                    <a
                      href={d.href}
                      {...(d.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="link-line"
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal y={40} className="rounded-[6px] bg-paper p-6 text-ink md:p-9">
          <p className="mb-2 h-sm">Tell us about your project</p>
          <p className="mb-6 text-[14px] text-stone">We’ll get back to you shortly.</p>
          <ContactForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
