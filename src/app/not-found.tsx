import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { GridBackdrop } from "@/components/effects/Backgrounds";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
      <Photo
        name="circuitBoard"
        baked
        className="absolute inset-0 -z-20 opacity-40"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas/60 via-canvas/90 to-canvas"
        aria-hidden="true"
      />
      <GridBackdrop className="-z-10" />
      <div className="container-page flex flex-col items-center gap-8 text-center">
        <p className="font-mono text-sm tracking-[0.2em] text-pulse uppercase">error_code: 404</p>
        <p className="text-signal font-display text-[clamp(6rem,3rem+14vw,16rem)] leading-none font-extrabold tracking-tighter">
          404
        </p>
        <h1 className="text-3xl font-semibold text-fg sm:text-4xl">
          This page took an offshore vacation.
        </h1>
        <p className="max-w-md text-fg-muted">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" size="lg" arrow>
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
