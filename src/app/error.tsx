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
    <section data-tone="paper" className="flex min-h-[80svh] items-center pt-24">
      <div className="container-page flex flex-col gap-6">
        <p className="label text-muted">( Something went wrong )</p>
        <h1 className="display-lg text-fg">
          We hit an <em className="italic">unexpected</em> error.
        </h1>
        <p className="max-w-md text-muted">
          Please try again. If the problem continues, contact us and we’ll sort it out.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
