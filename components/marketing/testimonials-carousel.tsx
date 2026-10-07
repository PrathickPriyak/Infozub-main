"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useId,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  name: string;
  quote: string;
};

type TestimonialsCarouselProps = {
  items: readonly TestimonialItem[];
  className?: string;
  /** Auto-advance interval in ms. Set 0 to disable. */
  intervalMs?: number;
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function usePerView(): number {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return perView;
}

export function TestimonialsCarousel({
  items,
  className,
  intervalMs = 6500,
}: TestimonialsCarouselProps) {
  const labelId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const perView = usePerView();
  const pageCount = Math.max(1, Math.ceil(items.length / perView));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const activePage = Math.min(page, pageCount - 1);

  const goTo = useCallback(
    (next: number) => {
      setPage(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  const goNext = useEffectEvent(() => {
    setPage((current) => {
      const safe = Math.min(current, pageCount - 1);
      return (safe + 1) % pageCount;
    });
  });

  useEffect(() => {
    if (reducedMotion || paused || intervalMs <= 0 || pageCount <= 1) {
      return;
    }
    const timer = window.setInterval(() => goNext(), intervalMs);
    return () => window.clearInterval(timer);
  }, [reducedMotion, paused, intervalMs, pageCount]);

  const start = activePage * perView;
  const visible = items.slice(start, start + perView);

  return (
    <div
      className={cn("testimonials-carousel", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
      >
        <p id={labelId} className="sr-only">
          Client testimonials
        </p>

        <div
          className={cn(
            "grid gap-4",
            perView > 1 ? "md:grid-cols-2" : "grid-cols-1",
          )}
          aria-live="polite"
        >
          {visible.map((item, index) => (
            <figure
              key={`${item.name}-${start + index}`}
              className="testimonial-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-7"
            >
              <span
                className="pointer-events-none absolute -right-3 -top-4 font-display text-7xl font-semibold leading-none text-ember/15 transition-colors duration-300 group-hover:text-ember/25"
                aria-hidden
              >
                ”
              </span>
              <Quote
                className="size-8 text-ember transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              />
              <blockquote className="relative mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {item.quote}
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ember-soft text-sm font-bold text-ember">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-muted">Published client review</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {pageCount > 1 ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Testimonial pages"
            >
              {Array.from({ length: pageCount }, (_, index) => {
                const selected = index === activePage;
                return (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`Show testimonials page ${index + 1}`}
                    className={cn(
                      "focus-ring h-2.5 rounded-full transition-[width,background-color] duration-300",
                      selected
                        ? "w-7 bg-ember"
                        : "w-2.5 bg-line hover:bg-ember/50",
                    )}
                    onClick={() => goTo(index)}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-ember/40 hover:bg-ember-soft hover:text-ember"
                aria-label="Previous testimonials"
                onClick={() => goTo(activePage - 1)}
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-ember/40 hover:bg-ember-soft hover:text-ember"
                aria-label="Next testimonials"
                onClick={() => goTo(activePage + 1)}
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
              <p className="ml-1 min-w-[3.5rem] text-xs font-medium tabular-nums text-muted">
                {activePage + 1} / {pageCount}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
