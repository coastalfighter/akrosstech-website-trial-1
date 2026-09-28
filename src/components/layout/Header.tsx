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

/** Two small link columns next to the logo (studio-site style). */
const navColumns = [
  [
    { label: "Services", href: "/services" },
    { label: "Websites", href: "/services/website-development" },
    { label: "About", href: "/about" },
  ],
  [
    { label: "Journal", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "LinkedIn", href: site.social.linkedin },
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

function NavLinkItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  const external = href.startsWith("http");
  const className = "group inline-flex items-center gap-1.5 text-[13px] leading-[1.35]";
  const inner = (
    <>
      <span
        className={cn(
          "size-1 rounded-full bg-lime transition-opacity",
          active ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <span className="roll">
        <span>{label}</span>
        <span aria-hidden="true">{label}</span>
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} aria-current={active ? "page" : undefined} className={className}>
      {inner}
    </Link>
  );
}

/**
 * Fixed studio header. Text colour follows the section underneath (see the
 * theme sensor in <MotionController>): light over dark sections, ink over
 * paper. The burger opens a full-screen ink menu.
 */
export function Header() {
  const pathname = usePathname();
  const lenis = useLenisInstance();
  const [menuOpen, setMenuOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  if (pathname !== previousPath) {
    setPreviousPath(pathname);
    setMenuOpen(false);
  }

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
        <div className="container-page grid h-18 grid-cols-[auto_1fr_auto] items-start gap-6 pt-5 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <Link href="/" aria-label="Akrostech — home" className="w-fit">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:col-span-2 lg:block">
            <div className="grid grid-cols-2 gap-6">
              {navColumns.map((column, i) => (
                <ul key={i} className="flex flex-col">
                  {column.map((item) => (
                    <li key={item.href}>
                      <NavLinkItem
                        href={item.href}
                        label={item.label}
                        active={!item.href.startsWith("http") && isActive(pathname, item.href)}
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
            className="group col-start-3 flex h-7 items-center gap-3 justify-self-end lg:col-start-4"
          >
            <span className="hidden text-[13px] sm:block">{menuOpen ? "Close" : "Menu"}</span>
            <span className="relative block h-2.5 w-6" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500",
                  menuOpen ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500",
                  menuOpen ? "top-1/2 -rotate-45" : "bottom-0 group-hover:scale-x-75",
                )}
                style={{ transformOrigin: "right" }}
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
            className="fixed inset-0 z-40 overflow-y-auto bg-ink text-paper"
            data-lenis-prevent
          >
            <div className="container-page grid min-h-full gap-12 pt-28 pb-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <nav aria-label="Menu">
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
                          className="group flex items-baseline gap-5 border-b border-paper/10 py-2.5"
                        >
                          <span className="w-8 mono text-fog tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "h-md transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-lime",
                              active && "text-lime",
                            )}
                          >
                            {item.label}
                          </span>
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
                  <p className="mono text-fog">Services</p>
                  <ul className="flex flex-col gap-1.5 text-[15px]">
                    {serviceLinks.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="inline-flex items-center gap-2 transition-colors hover:text-lime"
                        >
                          {s.label}
                          {s.badge && <Badge>{s.badge}</Badge>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="mono text-fog">Contact</p>
                  <a href={`mailto:${site.contact.email}`} className="link-line w-fit text-[15px]">
                    {site.contact.email}
                  </a>
                  <a href={site.contact.phoneHref} className="link-line w-fit text-[15px]">
                    {site.contact.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex h-11 w-fit items-center rounded-[3px] bg-lime px-5 text-[13px] font-medium text-ink transition-colors hover:bg-paper"
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
