"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { serviceLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { useLenisInstance } from "@/components/providers/SmoothScroll";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

/** Two link columns beside the logo, shown at the top of the page. */
const navColumns = [
  [
    { label: "Services", href: "/services" },
    { label: "Websites", href: "/services/website-development" },
    { label: "About", href: "/about" },
  ],
  [
    { label: "Journal", href: "/blog" },
    { label: "Industries", href: "/#industries" },
    { label: "Contact", href: "/contact" },
  ],
];

/** Full-screen menu entries. */
const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Past this scroll offset the nav columns fold away (logo + burger remain). */
const COMPACT_AFTER = 80;

function NavLinkItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group inline-flex items-center gap-2 font-display text-[18px] leading-[1.4] tracking-[-0.02em]"
    >
      <span className="roll">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
      {active && <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />}
    </Link>
  );
}

/**
 * Fixed studio header (juncastudio-style). At the top of the page it shows
 * the logo, two link columns and the burger; once you scroll, the columns
 * fold away and only the logo and burger remain. Text colour follows the
 * section beneath (theme sensor in <MotionController>).
 */
export function Header() {
  const pathname = usePathname();
  const lenis = useLenisInstance();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [previousPath, setPreviousPath] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  if (pathname !== previousPath) {
    setPreviousPath(pathname);
    setMenuOpen(false);
  }

  // Compact mode: only re-render when the threshold is actually crossed.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > COMPACT_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the menu is open; Escape closes it.
  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, lenis]);

  return (
    <>
      <header className={cn("site-header fixed inset-x-0 top-0 z-50", menuOpen && "is-menu-open")}>
        <div className="container-page grid grid-cols-[auto_1fr_auto] items-start gap-6 pt-6 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <Link href="/" aria-label="Akrostech — home" className="w-fit">
            <Logo />
          </Link>

          <nav
            aria-label="Main"
            className={cn(
              "hidden transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:col-span-2 lg:block",
              compact && !menuOpen && "pointer-events-none -translate-y-2 opacity-0",
            )}
            aria-hidden={compact && !menuOpen ? true : undefined}
          >
            <div className="grid grid-cols-2 gap-6">
              {navColumns.map((column, i) => (
                <ul key={i} className="flex flex-col">
                  {column.map((item) => (
                    <li key={item.href}>
                      <NavLinkItem
                        href={item.href}
                        label={item.label}
                        active={!item.href.includes("#") && isActive(pathname, item.href)}
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="group col-start-3 grid h-8 w-10 place-items-center justify-self-end lg:col-start-4"
          >
            <span className="relative block h-2.5 w-7" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500",
                  menuOpen ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full origin-right bg-current transition-transform duration-500",
                  menuOpen ? "top-1/2 -rotate-45" : "bottom-0 group-hover:scale-x-75",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper text-ink"
            data-lenis-prevent
          >
            <div className="container-page grid min-h-full gap-14 pt-32 pb-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <nav aria-label="Menu" className="flex flex-col gap-6">
                <p className="eyebrow text-stone">Navigation</p>
                <ul className="flex flex-col">
                  {menuLinks.map((item, i) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <m.li
                        key={item.href}
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + i * 0.05,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex items-center gap-4 py-1 font-display text-[clamp(2.4rem,1.6rem+2vw,3rem)] leading-[1.1] font-medium tracking-[-0.03em] transition-colors duration-300 hover:text-ink",
                            active ? "text-ink" : "text-stone",
                          )}
                        >
                          {item.label}
                          {active && (
                            <span className="size-2.5 rounded-full bg-lime" aria-hidden="true" />
                          )}
                        </Link>
                      </m.li>
                    );
                  })}
                </ul>
              </nav>

              <m.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-10 sm:grid-cols-2"
              >
                <div className="flex flex-col gap-3">
                  <p className="text-base">Our services</p>
                  <ul className="flex flex-col gap-1 text-base text-stone">
                    {serviceLinks.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                        >
                          {s.label}
                          {s.badge && <Badge>{s.badge}</Badge>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-base">Contact</p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="w-fit text-base text-stone transition-colors hover:text-ink"
                  >
                    {site.contact.email}
                  </a>
                  <a
                    href={site.contact.phoneHref}
                    className="w-fit text-base text-stone transition-colors hover:text-ink"
                  >
                    {site.contact.phone}
                  </a>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-base text-stone transition-colors hover:text-ink"
                  >
                    LinkedIn ↗
                  </a>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex h-11 w-fit items-center rounded-[2px] bg-lime px-6 text-[15px] text-ink transition-colors hover:bg-ink hover:text-lime"
                  >
                    Book a call ↗
                  </Link>
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
