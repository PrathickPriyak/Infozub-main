import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectClose } from "@/components/marketing/proof-sections";
import {
  ArticleCard,
  BlogCategoryFilter,
} from "@/components/blog/article-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import {
  blogCategories,
  blogEmpty,
  blogHero,
  blogSeo,
  formatPostDate,
  getFeaturedPost,
  getPostBySlug,
  getPostShareUrl,
  getPostSummaries,
  getRelatedPosts,
} from "@/content/blog";
import { site } from "@/content/site";

type BlogIndexProps = {
  category?: string;
};

export function BlogIndexPage({ category }: BlogIndexProps) {
  const allPosts = getPostSummaries();
  const featured = getFeaturedPost();
  const counts = Object.fromEntries(
    blogCategories.map((item) => [
      item.slug,
      allPosts.filter((post) => post.categories.includes(item.slug)).length,
    ]),
  );

  const posts = category
    ? allPosts.filter((post) => post.categories.includes(category))
    : allPosts;

  const listPosts =
    featured && !category
      ? posts.filter((post) => post.slug !== featured.slug)
      : posts;

  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow={blogHero.eyebrow}
        title={blogHero.title}
        description={blogHero.description}
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-white/30 text-white hover:bg-white/10 hover:text-white"
        >
          <Link href="/contact">Get in touch</Link>
        </Button>
      </PageHero>

      <Section>
        <Container>
          {allPosts.length === 0 ? (
            <Reveal>
              <div
                className="rounded-2xl border border-line bg-mist/40 px-6 py-14 text-center md:px-10"
                role="status"
              >
                <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-ember-soft text-ember">
                  <FileText className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-ink md:text-3xl">
                  {blogEmpty.title}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {blogEmpty.description}
                </p>
                <Button asChild variant="signal" className="mt-8">
                  <Link href={blogEmpty.ctaHref}>{blogEmpty.ctaLabel}</Link>
                </Button>
              </div>
            </Reveal>
          ) : (
            <>
              <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeader
                  eyebrow="Articles"
                  title={
                    category
                      ? blogCategories.find((item) => item.slug === category)
                          ?.title ?? "Articles"
                      : `${allPosts.length} article${allPosts.length === 1 ? "" : "s"}`
                  }
                  description={blogSeo.description}
                  className="mb-0"
                />
                <BlogCategoryFilter active={category} counts={counts} />
              </div>

              {featured && !category ? (
                <div className="mb-10">
                  <ArticleCard post={featured} featured />
                </div>
              ) : null}

              {listPosts.length > 0 ? (
                <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {listPosts.map((post) => (
                    <StaggerItem key={post.slug}>
                      <ArticleCard post={post} />
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : (
                <p className="text-sm text-muted">
                  No articles in this category yet.
                </p>
              )}
            </>
          )}
        </Container>
      </Section>

      <ProjectClose />
    </MarketingPage>
  );
}

export function BlogArticlePage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const shareUrl = getPostShareUrl(slug);

  return (
    <MarketingPage transparentHeader>
      <PageHero
        eyebrow="Article"
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="border-white/25 bg-white/5 text-white"
            >
              {blogCategories.find((item) => item.slug === category)?.title ??
                category}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-white/75">
          {post.author ? (
            <>
              <span className="font-medium text-white">{post.author.name}</span>
              {post.author.role ? ` · ${post.author.role}` : null}
              {" · "}
            </>
          ) : null}
          <time dateTime={post.publishedAt}>
            {formatPostDate(post.publishedAt)}
          </time>
        </p>
      </PageHero>

      {post.coverImage ? (
        <Section tone="surface" className="!pt-10">
          <Container>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-mist shadow-soft">
              <Image
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container className="max-w-3xl">
          <article>
            <div
              className="blog-prose space-y-4 text-base leading-relaxed text-muted md:text-lg [&_a]:font-semibold [&_a]:text-navy [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_p]:text-muted [&_strong]:text-ink"
              // contentHtml is sanitized on load in content/blog/index.ts
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>

          <div className="mt-10 border-t border-line pt-8">
            <ShareButtons url={shareUrl} title={post.title} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/blog">All articles</Link>
            </Button>
            <Button asChild variant="signal">
              <Link href="/contact">Contact INFOZUB</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="surface">
          <Container>
            <SectionHeader title="Related posts" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-semibold text-white">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
            Call {site.phoneDisplay} or send a message — we will get in touch
            with you soon.
          </p>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-8 border-transparent bg-white text-ink hover:bg-mist"
          >
            <Link href="/contact">Get in touch</Link>
          </Button>
        </Container>
      </Section>
    </MarketingPage>
  );
}
