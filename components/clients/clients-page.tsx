import Image from "next/image";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  clientLogos,
  clientsHero,
  clientsLogosHeading,
} from "@/content/clients";
import { namedResults, testimonials } from "@/content/proof";

export function ClientsPage() {
  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow={clientsHero.eyebrow}
        title={clientsHero.title}
        description={clientsHero.description}
      >
        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <Button asChild variant="signal" size="lg" className="cta-pulse">
              <a href="#client-logos">Browse logos</a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Become a client</Link>
            </Button>
          </Magnetic>
        </div>
      </PageHero>

      <Section tone="surface" id="client-logos" pattern="dots">
        <Container>
          <SectionHeader
            eyebrow={clientsLogosHeading.eyebrow}
            title={clientsLogosHeading.title}
            description={clientsLogosHeading.description}
          />
          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {clientLogos.map((client) => (
              <StaggerItem key={client.id}>
                <article className="client-logo-card group relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface px-4 py-5 shadow-soft">
                  <span
                    className="client-logo-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0"
                    aria-hidden
                  />
                  <Image
                    src={client.src}
                    alt={`${client.name} logo`}
                    width={220}
                    height={120}
                    className="client-logo-image max-h-14 w-auto max-w-full object-contain transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 160px"
                  />
                  <p className="sr-only">{client.name}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Named results"
            title="Campaigns published with figures"
            description="INFOZUB has published named campaign outcomes for these engagements."
          />
          <Stagger className="grid gap-5 md:grid-cols-2">
            {namedResults.map((item) => (
              <StaggerItem key={item.client}>
                <Link
                  href={item.href}
                  className="block h-full rounded-xl focus-ring"
                >
                  <Card interactive className="h-full">
                    <CardTitle>{item.client}</CardTitle>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {item.highlights.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <Button asChild variant="outline">
              <Link href="/projects">View project pages</Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeader
            eyebrow="What our clients say"
            title="Testimonials"
            description="Reviews published on the Infozub website."
          />
          <Stagger className="grid gap-4 md:grid-cols-2">
            {testimonials.slice(0, 4).map((item) => (
              <StaggerItem key={item.name}>
                <figure className="h-full rounded-xl border border-line bg-surface p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
                  <blockquote className="whitespace-pre-line text-sm leading-relaxed text-muted">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-ink">
                    {item.name}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/reviews">Read all reviews</Link>
            </Button>
            <Magnetic>
              <Button asChild variant="signal" className="cta-pulse">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </Magnetic>
          </Reveal>
        </Container>
      </Section>
    </MarketingPage>
  );
}
