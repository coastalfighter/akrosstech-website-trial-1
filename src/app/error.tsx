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
      <div className="container-page flex flex-col gap-6">
        <p className="mono text-stone">( Something went wrong )</p>
        <h1 className="h-lg">
          We hit an <span className="opacity-50">unexpected error.</span>
        </h1>
        <p className="max-w-md text-base leading-[1.4] text-stone">
          Please try again. If the problem continues, contact us and we’ll sort it out.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
