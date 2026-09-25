"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { mainNav, serviceLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LinkedInIcon } from "@/components/ui/Icon";
import { useLenisInstance } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function Header() {
  const pathname = usePathname();
  const lenis = useLenisInstance();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState(pathname);
  const lastY = useRef(0);
  const servicesRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close menus on navigation (adjust-state-on-prop-change pattern).
  if (pathname !== previousPath) {
    setPreviousPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Glass background after scrolling; hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 400) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open; close it with Escape.
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

  // Close the services dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-out",
          scrolled
            ? "border-line bg-ink-950/70 border-b backdrop-blur-xl"
            : "border-b border-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="Akrostech — home" className="relative z-10 shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <li
                    key={item.href}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-full py-2 pr-1 pl-4 text-sm font-medium transition-colors hover:text-lime-500",
                          isActive(pathname, item.href) ? "text-lime-500" : "text-fg/80",
                        )}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="services-menu"
                        aria-label="Show services"
                        onClick={() => setServicesOpen((v) => !v)}
                        className="text-fg/70 rounded-full p-2 transition-colors hover:text-lime-500"
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-300",
                            servicesOpen && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {servicesOpen && (
                        <m.div
                          id="services-menu"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 w-[340px] -translate-x-1/2 pt-3"
                        >
                          <ul className="glass rounded-2xl p-2 shadow-2xl shadow-black/60">
                            {serviceLinks.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className={cn(
                                    "flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-white/[0.06] hover:text-lime-500",
                                    pathname === link.href ? "text-lime-500" : "text-fg/85",
                                  )}
                                >
                                  {link.label}
                                  {link.badge && <Badge>{link.badge}</Badge>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-lime-500",
                        isActive(pathname, item.href) ? "text-lime-500" : "text-fg/80",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.contact.phoneHref}
              className="text-fg/80 hidden items-center gap-2 text-sm transition-colors hover:text-lime-500 xl:flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.contact.phone}
            </a>
            <ButtonLink href="/contact" size="md" arrow className="hidden sm:inline-flex">
              Get Started
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="border-line-strong text-fg relative z-10 grid size-11 place-items-center rounded-full border bg-white/[0.03] transition-colors hover:border-lime-500 hover:text-lime-500 lg:hidden"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="bg-ink-900 fixed inset-0 z-40 overflow-y-auto pt-24 pb-10 lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="container-page">
              <ul className="flex flex-col">
                {[...mainNav.filter((i) => !i.children), ...serviceLinks].map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-line border-b"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "font-display flex items-center justify-between py-4 text-2xl font-medium transition-colors hover:text-lime-500",
                        pathname === item.href ? "text-lime-500" : "text-fg",
                      )}
                    >
                      {item.label}
                      {item.badge && <Badge>{item.badge}</Badge>}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-fg-muted mt-10 flex flex-col gap-4"
              >
                <a href={site.contact.phoneHref} className="hover:text-lime-500">
                  {site.contact.phone}
                </a>
                <a href={`mailto:${site.contact.email}`} className="hover:text-lime-500">
                  {site.contact.email}
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-lime-500"
                >
                  <LinkedInIcon className="size-4" /> LinkedIn
                </a>
                <ButtonLink href="/contact" size="lg" arrow className="mt-4 w-full">
                  Get Started
                </ButtonLink>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
