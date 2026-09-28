"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { mainNav, serviceLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { servicePhotos, type PhotoKey } from "@/content/media";
import { Photo } from "@/components/ui/Photo";
import { useLenisInstance } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

/** Menu overlay entries: pages + every service, each with a preview photo. */
const menuItems: { label: string; href: string; photo: PhotoKey; badge?: string }[] = [
  { label: "Home", href: "/", photo: "heroEarth" },
  { label: "Studio", href: "/about", photo: "teamLaptops" },
  { label: "Services", href: "/services", photo: "meeting" },
  ...serviceLinks.map((s) => ({
    label: s.label,
    href: s.href,
    badge: s.badge,
    photo: servicePhotos[s.href.split("/").pop() ?? ""]?.hero ?? ("blocks" as PhotoKey),
  })),
  { label: "Journal", href: "/blog", photo: "library" },
  { label: "Contact", href: "/contact", photo: "handshake" },
];

/** Nav link whose label rolls to a duplicate on hover. */
function RollLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group relative inline-flex items-center gap-2 py-2 label"
    >
      <span
        className={cn(
          "size-1 rounded-full bg-lime transition-opacity",
          active ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const lenis = useLenisInstance();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [previousPath, setPreviousPath] = useState(pathname);
  const lastY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  if (pathname !== previousPath) {
    setPreviousPath(pathname);
    setMenuOpen(false);
  }

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 300 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y < 300) setHidden(false);
      lastY.current = y;
    };
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
      <header
        // While the ink menu overlay is open the bar must read as ink too.
        data-tone={menuOpen ? "ink" : undefined}
        data-tone-scope={menuOpen ? "" : undefined}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-fg transition-[transform,color,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          hidden && !menuOpen && "-translate-y-full",
          // Once the page moves, a quiet backdrop keeps links legible over content.
          scrolled && !menuOpen && "border-b border-line bg-bg/80 backdrop-blur-md",
        )}
      >
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="Akrostech — home" className="relative z-10 shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <RollLink href={item.href} active={isActive(pathname, item.href)}>
                    {item.label}
                  </RollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/contact"
              className="group hidden h-10 items-center rounded-full border border-line-strong px-5 label transition-colors hover:border-lime hover:bg-lime hover:text-ink sm:inline-flex"
            >
              <span className="roll">
                <span>Book a call</span>
                <span aria-hidden="true">Book a call</span>
              </span>
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="group flex h-10 items-center gap-3 pl-2 label"
            >
              <span className="roll hidden sm:inline-flex">
                <span>{menuOpen ? "Close" : "Menu"}</span>
                <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
              </span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500",
                    menuOpen ? "top-1/2 rotate-45" : "top-0 group-hover:translate-x-1",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500",
                    menuOpen ? "top-1/2 -rotate-45" : "bottom-0 group-hover:-translate-x-1",
                  )}
                />
              </span>
            </button>
          </div>
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
            exit={{ clipPath: "inset(100% 0 0% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink text-paper"
            data-tone="ink"
            data-tone-scope=""
            data-lenis-prevent
          >
            <div className="container-page grid min-h-full gap-10 pt-28 pb-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <nav aria-label="Menu">
                <ul>
                  {menuItems.map((item, i) => (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      onPointerEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-baseline gap-4 py-1.5 md:py-1"
                      >
                        <span className="w-8 label text-paper/50 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-serif text-[2rem] leading-[1.05] transition-[transform,opacity] duration-500 md:text-[2.75rem] lg:text-5xl",
                            "group-hover:translate-x-3 group-hover:italic",
                            isActive(pathname, item.href) && item.href !== "/" ? "italic" : "",
                            hovered === i ? "opacity-100" : "opacity-60 lg:opacity-40",
                          )}
                        >
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="rounded-full border border-paper/40 px-2 py-0.5 label !text-[9px]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </m.li>
                  ))}
                </ul>
              </nav>
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="hidden flex-col gap-8 lg:flex"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {menuItems.map((item, i) => (
                    <Photo
                      key={item.href}
                      name={item.photo}
                      baked
                      sizes="480px"
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        hovered === i ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6 label text-paper/70">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-paper/40">( Contact )</span>
                    <a href={site.contact.phoneHref} className="link-line w-fit">
                      {site.contact.phone}
                    </a>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="link-line w-fit tracking-normal normal-case"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-paper/40">( Follow )</span>
                    <a
                      href={site.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line w-fit"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
