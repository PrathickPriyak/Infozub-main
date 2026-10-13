import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  href?: string;
  compact?: boolean;
  /** For transparent headers over dark heroes */
  inverse?: boolean;
};

const LOGO = {
  light: {
    src: "/brand/infozub-logo-navy.png",
    width: 500,
    height: 143,
  },
  inverse: {
    src: "/brand/infozub-logo.png",
    width: 500,
    height: 143,
  },
} as const;

export function BrandMark({
  className,
  href = "/",
  compact = false,
  inverse = false,
}: BrandMarkProps) {
  const asset = inverse ? LOGO.inverse : LOGO.light;

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center rounded-md focus-ring",
        className,
      )}
      aria-label={`${site.legalName} home`}
    >
      <Image
        src={asset.src}
        alt={`${site.name} — Your Targeted Marketing Partner!`}
        width={asset.width}
        height={asset.height}
        priority
        className={cn(
          "h-auto w-auto max-w-[min(100%,11.5rem)] object-contain object-left transition duration-300 group-hover:opacity-90 sm:max-w-[13.5rem]",
          compact
            ? "max-h-8 sm:max-h-9"
            : "max-h-9 sm:max-h-11",
        )}
        sizes="(max-width: 640px) 180px, 220px"
      />
    </Link>
  );
}
