import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      className="flex min-h-svh flex-col justify-between bg-ink pt-32 pb-16 text-paper"
      data-theme="dark"
    >
      <div className="container-page flex flex-col gap-8">
        <Eyebrow className="text-fog">Error 404</Eyebrow>
        <h1 className="max-w-4xl h-lg">
          This page took an <span className="opacity-50">offshore vacation.</span>
        </h1>
        <p className="max-w-md text-[15px] leading-relaxed text-fog">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" variant="solid" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact">Contact us</ButtonLink>
        </div>
      </div>
      <p
        className="container-page text-[34vw] leading-[0.8] font-medium tracking-[-0.07em] text-lime select-none"
        aria-hidden="true"
      >
        404
      </p>
    </section>
  );
}
