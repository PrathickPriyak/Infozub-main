"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[route-error]", error.digest ?? error.message);
  }, [error]);

  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-4 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal-strong">
        Error
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        This page could not be loaded. Try again, or contact INFOZUB if the
        problem continues.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button" variant="signal" size="lg" onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
