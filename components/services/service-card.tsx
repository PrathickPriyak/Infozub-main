import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Cloud,
  Layout,
  Mail,
  MapPin,
  Megaphone,
  PhoneCall,
  PlayCircle,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { ServiceRecord } from "@/content/services";
import { cn } from "@/lib/utils";

const iconBySlug: Record<string, LucideIcon> = {
  "facebook-ads": Megaphone,
  "instagram-ads": Smartphone,
  "google-ads": Search,
  "youtube-ads": PlayCircle,
  "twitter-ads": AtSign,
  "linkedin-ads": Users,
  "gmb-ads": MapPin,
  "cloud-solutions": Cloud,
  "creative-designing": Sparkles,
  "sales-support": Users,
  "social-management": Share2,
  "cloud-telephony": PhoneCall,
  "lead-management": Layout,
  "website-development": Layout,
  "influencer-marketing": Users,
  "social-media-marketing": Share2,
  "search-engine-optimization": Search,
  "email-marketing": Mail,
};

export function getServiceIcon(slug: string): LucideIcon {
  return iconBySlug[slug] ?? Sparkles;
}

export function ServiceIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = iconBySlug[slug] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}

type ServiceCardProps = {
  service: ServiceRecord;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  const hasDetail = Boolean(service.overview);
  const href = hasDetail ? service.href : "/digital-suite";
  const ctaLabel = hasDetail ? "Learn more" : "View Digital Suite";

  return (
    <Card
      interactive
      className={cn("group flex h-full flex-col", className)}
    >
      <div className="flex size-10 items-center justify-center rounded-md bg-signal-soft text-signal-strong transition-transform duration-200 group-hover:scale-105">
        <ServiceIcon slug={service.slug} className="size-5" />
      </div>
      <CardTitle className="mt-4 transition-colors group-hover:text-navy">
        {service.title}
      </CardTitle>
      <CardDescription className="flex-1">{service.description}</CardDescription>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:text-signal-strong focus-ring rounded-sm"
      >
        {ctaLabel}
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </Card>
  );
}

type RelatedServicesProps = {
  services: readonly ServiceRecord[];
};

export function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}

export function ServiceContactCta({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-xl border border-line bg-mist/70 p-5",
        className,
      )}
    >
      <p className="mr-auto text-sm text-muted">
        Ready to talk about this service? Reach the INFOZUB team.
      </p>
      <Button asChild variant="signal">
        <Link href="/contact">Get in touch</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/digital-suite">Digital Suite</Link>
      </Button>
    </div>
  );
}
