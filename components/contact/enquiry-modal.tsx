"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ContactForm } from "@/components/contact/contact-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "infozub-enquiry-modal-seen";
const OPEN_DELAY_MS = 1400;

/**
 * Welcome enquiry modal — opens once per browser session on marketing pages.
 * Dismissible; reuses the same ContactForm + /api/contact pipeline.
 */
export function EnquiryModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/contact") return;

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      // sessionStorage may be blocked; still show once this mount.
    }

    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  function markSeen() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) markSeen();
  }

  function handleSuccess() {
    markSeen();
    window.setTimeout(() => setOpen(false), 2200);
  }

  if (pathname === "/contact") return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby="enquiry-modal-desc"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          const root = event.currentTarget;
          if (!(root instanceof HTMLElement)) return;
          const focusable = root.querySelector<HTMLElement>(
            'button[aria-pressed], input:not([type="hidden"])',
          );
          focusable?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>Enquire About Digital Marketing</DialogTitle>
          <DialogDescription id="enquiry-modal-desc">
            Get a Free Consultation — share a few details and our team will
            contact you. Takes under a minute.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          <Suspense
            fallback={
              <p className="text-sm text-muted">Loading enquiry form…</p>
            }
          >
            <ContactForm
              compact
              channel="modal"
              defaultInterest="Digital Marketing Services"
              onSuccess={handleSuccess}
            />
          </Suspense>
        </div>

        <div className="shrink-0 border-t border-line px-5 py-3 sm:px-6">
          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted"
            onClick={() => handleOpenChange(false)}
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
