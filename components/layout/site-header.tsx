"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/digital-suite", label: "Digital Suite" },
  { href: "/courses", label: "Academy" },
  { href: "/ventures", label: "Ventures" },
  { href: "/clients", label: "Clients" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn("sticky top-0 z-40 border-b border-line/80 bg-mist/85 backdrop-blur-md", className)}>
      <div className="hidden border-b border-line/70 bg-ink text-white md:block">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <a
            href="tel:+919944640033"
            className="inline-flex items-center gap-2 text-white/90 transition hover:text-white"
          >
            <Phone className="size-3.5" aria-hidden />
            +91 99 44 64 00 33
          </a>
          <a
            href="mailto:info@infozub.com"
            className="text-white/90 transition hover:text-white"
          >
            info@infozub.com
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-navy/5 hover:text-ink focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="signal" size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Get in touch</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Site navigation
              </SheetDescription>
              <BrandMark compact />
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                <Link
                  href="/"
                  className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-mist"
                >
                  Home
                </Link>
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-mist"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button asChild variant="signal" className="mt-auto">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
