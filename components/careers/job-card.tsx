import Link from "next/link";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { JobOpening } from "@/content/careers";
import { resumeCta, resumeEmail } from "@/content/careers";
import { cn } from "@/lib/utils";

type JobCardProps = {
  job: JobOpening;
  className?: string;
};

export function JobCard({ job, className }: JobCardProps) {
  return (
    <Card
      interactive
      className={cn("group flex h-full flex-col", className)}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="signal">{job.type}</Badge>
        <Badge variant="neutral">{job.department}</Badge>
      </div>
      <CardTitle className="mt-4 transition-colors group-hover:text-navy">
        {job.title}
      </CardTitle>
      <CardDescription className="flex-1">{job.summary}</CardDescription>
      <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
        <MapPin className="size-4 shrink-0" aria-hidden />
        {job.location}
      </p>
      <Link
        href={`/careers/${job.slug}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:text-signal-strong focus-ring rounded-sm"
      >
        View role
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </Card>
  );
}

type JobOpeningsListProps = {
  jobs: readonly JobOpening[];
};

export function JobOpeningsList({ jobs }: JobOpeningsListProps) {
  if (jobs.length === 0) {
    return <CareersEmptyOpenings />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job.slug} job={job} />
      ))}
    </div>
  );
}

export function CareersEmptyOpenings() {
  return (
    <div
      className="rounded-2xl border border-dashed border-line bg-mist/60 px-6 py-10 text-center md:px-10"
      role="status"
    >
      <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-signal-soft text-signal-strong">
        <Briefcase className="size-5" aria-hidden />
      </span>
      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
        {resumeCta.title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        {resumeCta.description}
      </p>
      <div className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button asChild variant="signal" className="w-full sm:w-auto">
          <a href={`mailto:${resumeEmail}`}>{resumeCta.emailLabel}</a>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/careers/apply">{resumeCta.applyLabel}</Link>
        </Button>
      </div>
    </div>
  );
}

export function CareersResumeCta({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-line bg-mist/70 p-5 sm:flex-row sm:items-center",
        className,
      )}
    >
      <div className="mr-auto min-w-0">
        <p className="font-display text-lg font-semibold text-ink">
          {resumeCta.title}
        </p>
        <p className="mt-1 text-sm text-muted">{resumeCta.description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="signal">
          <a href={`mailto:${resumeEmail}`}>Email resume</a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/careers/apply">Apply</Link>
        </Button>
      </div>
    </div>
  );
}
