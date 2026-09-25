"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav, serviceLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LinkedInIcon } from "@/components/ui/Icon";
import { LiveClock } from "@/components/ui/LiveClock";
import { useLenisInstance } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

/** Mono status strip: live U.S./India clocks + contact. */
function StatusBar() {
  return (
    <div className="hidden border-b border-line bg-void/80 md:block">
      <div className="container-page flex h-9 items-center justify-between font-mono text-[11px] tracking-[0.12em] text-fg-subtle uppercase">
        <p className="flex items-center gap-2">
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-ok/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
          </span>
          Delivery teams online
        </p>
        <p className="flex items-center gap-5">
          <span>
            NYC <LiveClock timeZone="America/New_York" className="text-fg-muted" />
          </span>
          <span>
            LA <LiveClock timeZone="America/Los_Angeles" className="text-fg-muted" />
          </span>
          <span>
            IND <LiveClock timeZone="Asia/Kolkata" className="text-fg-muted" />
          </span>
          <a
            href={site.contact.phoneHref}
            className="text-fg-muted transition-colors hover:text-pulse"
          >
            {site.contact.phone}
          </a>
        </p>
      </div>
    </div>
  );
}

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

  // Solid bar after scrolling; hide on scroll down, reveal on scroll up.
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
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <StatusBar />
        <div
          className={cn(
            "border-b transition-[background-color,border-color] duration-500",
            scrolled || menuOpen
              ? "border-line bg-canvas/85 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="container-page flex h-[68px] items-center justify-between gap-6">
            <Link href="/" aria-label="Akrostech — home" className="relative z-10 shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1 rounded-xl border border-line bg-panel/60 p-1 backdrop-blur">
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
                            "rounded-lg py-2 pr-1 pl-4 text-sm font-medium transition-colors hover:text-white",
                            isActive(pathname, item.href) ? "text-white" : "text-fg-muted",
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
                          className="rounded-lg p-2 text-fg-muted transition-colors hover:text-white"
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
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-1/2 w-[380px] -translate-x-1/2 pt-3"
                          >
                            <ul className="rounded-xl p-2 shadow-2xl shadow-black/70 glass">
                              {serviceLinks.map((link, i) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className={cn(
                                      "group flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-signal/10",
                                      pathname === link.href
                                        ? "text-white"
                                        : "text-fg-muted hover:text-white",
                                    )}
                                  >
                                    <span className="flex items-center gap-3">
                                      <span className="font-mono text-[10px] text-fg-subtle">
                                        0{i + 1}
                                      </span>
                                      {link.label}
                                    </span>
                                    {link.badge ? (
                                      <Badge>{link.badge}</Badge>
                                    ) : (
                                      <ArrowUpRight
                                        className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                                        aria-hidden="true"
                                      />
                                    )}
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
                          "relative block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                          isActive(pathname, item.href)
                            ? "bg-white/[0.06] text-white"
                            : "text-fg-muted",
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
                className="relative z-10 grid size-11 place-items-center rounded-lg border border-line-strong bg-panel/70 text-fg transition-colors hover:border-pulse hover:text-pulse lg:hidden"
              >
                {menuOpen ? (
                  <X className="size-5" aria-hidden="true" />
                ) : (
                  <Menu className="size-5" aria-hidden="true" />
                )}
              </button>
            </div>
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
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-void pt-24 pb-10 lg:hidden"
            data-lenis-prevent
          >
            <div
              className="pointer-events-none absolute inset-0 grid-lines mask-radial opacity-50"
              aria-hidden="true"
            />
            <nav aria-label="Mobile" className="relative container-page">
              <ul className="flex flex-col">
                {[...mainNav.filter((i) => !i.children), ...serviceLinks].map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between gap-4 py-4 font-display text-2xl font-semibold transition-colors hover:text-pulse",
                        pathname === item.href ? "text-pulse" : "text-fg",
                      )}
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-fg-subtle">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </span>
                      {item.badge && <Badge>{item.badge}</Badge>}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-col gap-4 font-mono text-sm text-fg-muted"
              >
                <a href={site.contact.phoneHref} className="hover:text-pulse">
                  {site.contact.phone}
                </a>
                <a href={`mailto:${site.contact.email}`} className="hover:text-pulse">
                  {site.contact.email}
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-pulse"
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
