"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShareButtonsProps = {
  url: string;
  title: string;
  className?: string;
};

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or unsupported — fall through to copy
      }
    }
    await copyLink();
  }

  return (
    <div className={cn("flex max-w-full flex-wrap items-center gap-2", className)}>
      <p className="mr-1 w-full text-sm font-medium text-muted sm:mr-1 sm:w-auto">
        Share
      </p>
      <Button type="button" variant="outline" size="sm" onClick={nativeShare}>
        <Share2 className="size-4" aria-hidden />
        Share
      </Button>
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={copyLink}>
        {copied ? (
          <Check className="size-4" aria-hidden />
        ) : (
          <Link2 className="size-4" aria-hidden />
        )}
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}
