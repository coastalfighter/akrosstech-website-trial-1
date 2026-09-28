import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/layout/Wordmark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section data-tone="paper" className="flex min-h-[100svh] flex-col justify-between pt-32 pb-6">
      <div className="container-page flex flex-col gap-8">
        <p className="label text-muted">( Error 404 )</p>
        <h1 className="max-w-4xl display-lg text-fg">
          This page took an <em className="italic">offshore vacation.</em>
        </h1>
        <p className="max-w-md text-muted">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
      <Wordmark text="404" className="px-4 text-fg" />
    </section>
  );
}
