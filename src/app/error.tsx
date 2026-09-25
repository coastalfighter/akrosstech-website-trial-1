"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center pt-24">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <p className="font-display text-sm tracking-[0.3em] text-lime-500 uppercase">
          Something went wrong
        </p>
        <h1 className="text-fg text-4xl font-medium">We hit an unexpected error.</h1>
        <p className="text-fg-muted max-w-md">
          Please try again. If the problem continues, contact us and we’ll sort it out.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" size="lg" variant="secondary">
            Back to Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
