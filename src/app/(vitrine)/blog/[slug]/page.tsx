import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ArticleContent } from "@/components/blog/article-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableOfContents } from "@/components/blog/table-of-contents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, seo_title, seo_description, excerpt, cover_image_url")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return {};

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      type: "article",
    },
  };
}

export const revalidate = 3600;

function extractHeadings(content: string) {
  const regex = /^##\s+(.+)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ text, id });
  }
  return headings;
}

function estimateReadingTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    notFound();
  }

  // Related articles
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, cover_image_url, excerpt")
    .eq("status", "published")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(2);

  const publishedDate = post.published_at
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(post.published_at))
    : null;

  const readingTime = estimateReadingTime(post.content);
  const headings = extractHeadings(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: "N\u00e9alma" },
    publisher: { "@type": "Organization", name: "N\u00e9alma" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero full-bleed */}
      <section className="relative flex min-h-[400px] items-end overflow-hidden sm:min-h-[460px]">
        {/* Background */}
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-nealma-300 via-nealma-200 to-nealma-green-200" />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 pb-8 pt-24 sm:px-10 sm:pb-10">
          <div className="mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <nav className="mb-4 text-sm text-white/70">
              <Link href="/" className="hover:text-white hover:underline">
                Accueil
              </Link>
              <span className="mx-2">&rsaquo;</span>
              <Link href="/blog" className="hover:text-white hover:underline">
                Blog
              </Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white/50">Article</span>
            </nav>

            {/* Title */}
            <h1 className="max-w-3xl text-3xl font-heading font-bold leading-tight text-white sm:text-4xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              {publishedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {publishedDate}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {readingTime} min de lecture
              </span>
              <span className="flex items-center gap-1.5">
                <User className="size-3.5" />
                par N&eacute;alma
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <div className="mx-auto grid max-w-5xl gap-0 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div className="border-nealma-border/20 px-6 py-10 sm:px-10 lg:border-r">
          {/* Excerpt box */}
          {post.excerpt && (
            <div className="mb-8 rounded-r-lg border-l-4 border-nealma-300 bg-nealma-50/50 px-5 py-4 text-sm italic leading-relaxed text-nealma-text-light">
              {post.excerpt}
            </div>
          )}

          {/* Article body */}
          <ArticleContent content={post.content} />

          {/* Inline CTA */}
          <div className="my-10 rounded-xl border-2 border-dashed border-nealma-border/60 bg-nealma-bg-warm p-6 text-center sm:p-8">
            <h4 className="text-lg font-heading font-bold text-nealma-text">
              Besoin d&apos;un accompagnement personnalis&eacute; ?
            </h4>
            <p className="mt-2 text-sm text-nealma-text-light">
              Je me d&eacute;place &agrave; votre domicile en &Icirc;le-de-France
              pour une s&eacute;ance adapt&eacute;e &agrave; vos besoins.
            </p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/reservation">
                  R&eacute;server une s&eacute;ance &rarr;
                </Link>
              </Button>
            </div>
          </div>

          {/* Separator */}
          <hr className="my-8 border-t-2 border-dashed border-nealma-border/30" />

          {/* Share row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-nealma-400 hover:underline"
            >
              <ArrowLeft className="size-4" />
              Retour au blog
            </Link>
          </div>

          <hr className="my-8 border-t-2 border-dashed border-nealma-border/30" />

          {/* Author card */}
          <div className="flex items-center gap-4 rounded-xl border border-nealma-border/40 bg-nealma-bg-warm/50 p-5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-nealma-100">
              <Image
                src="/images/logo.avif"
                alt="N\u00e9alma"
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-heading font-bold text-nealma-text">
                N&eacute;alma &mdash; Infirmi&egrave;re dipl&ocirc;m&eacute;e
                d&apos;&Eacute;tat
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-nealma-text-light">
                Sp&eacute;cialis&eacute;e en soins p&eacute;rinataux &agrave;
                domicile en &Icirc;le-de-France. Massage pr&eacute;natal,
                postnatal et accompagnement allaitement.
              </p>
            </div>
          </div>

          {/* Related articles */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-4 border-b-2 border-nealma-border/30 pb-3 text-lg font-heading font-bold text-nealma-text">
                Articles li&eacute;s
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group grid grid-cols-[80px_1fr] overflow-hidden rounded-lg border border-nealma-border/40 transition-shadow hover:shadow-md"
                  >
                    <div className="relative min-h-[70px]">
                      {related.cover_image_url ? (
                        <Image
                          src={related.cover_image_url}
                          alt={related.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-nealma-50 to-nealma-100" />
                      )}
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-[11px] uppercase tracking-wider text-nealma-text-light/60">
                        Article
                      </p>
                      <p className="mt-0.5 text-sm font-semibold leading-snug text-nealma-text group-hover:text-nealma-400">
                        {related.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky sidebar */}
        <aside className="hidden bg-nealma-bg-warm/30 px-5 py-10 lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Table of contents */}
            {headings.length > 0 && (
              <TableOfContents headings={headings} />
            )}

            {/* Booking CTA */}
            <div className="overflow-hidden rounded-xl border border-nealma-border/40 bg-white">
              <div className="h-24 bg-gradient-to-br from-nealma-200 to-nealma-green-100" />
              <div className="p-4">
                <h4 className="font-heading text-sm font-bold text-nealma-text">
                  Soins p&eacute;rinataux &agrave; domicile
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-nealma-text-light">
                  Massage pr&eacute;natal, postnatal et accompagnement
                  personnalis&eacute; en &Icirc;le-de-France.
                </p>
                <Button asChild size="sm" className="mt-3 w-full">
                  <Link href="/reservation">
                    R&eacute;server un soin &rarr;
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar newsletter */}
            <div className="rounded-xl border-2 border-dashed border-nealma-border/40 bg-white p-4 text-center">
              <h4 className="font-heading text-sm font-bold text-nealma-text">
                Newsletter
              </h4>
              <p className="mt-1 text-xs text-nealma-text-light">
                Recevez nos prochains articles dans votre bo&icirc;te mail.
              </p>
              <Input
                type="email"
                placeholder="votre@email.fr"
                className="mt-3 text-xs"
              />
              <Button size="sm" className="mt-2 w-full">
                S&apos;inscrire
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
