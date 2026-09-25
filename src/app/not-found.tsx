import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/layout/Logo";
import { DotGrid, GradientMesh } from "@/components/effects/Backgrounds";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
      <GradientMesh />
      <DotGrid />
      <div className="container-page relative flex flex-col items-center gap-8 text-center">
        <LogoMark className="animate-float w-24 text-lime-500" />
        <p className="font-display text-gradient-lime text-[clamp(6rem,4rem+10vw,14rem)] leading-none font-semibold tracking-tighter">
          404
        </p>
        <h1 className="text-fg text-3xl font-medium sm:text-4xl">
          This page took an offshore vacation.
        </h1>
        <p className="text-fg-muted max-w-md">
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
