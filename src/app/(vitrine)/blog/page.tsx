import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/blog/article-card";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";
import { EyebrowBadge } from "@/components/vitrine/eyebrow-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils et articles sur la grossesse, l'allaitement, les soins du b\u00e9b\u00e9 et le bien-\u00eatre p\u00e9rinatal par N\u00e9alma, infirmi\u00e8re sp\u00e9cialis\u00e9e.",
};

export const revalidate = 3600;

const ARTICLES_PER_PAGE = 6;

const categories = [
  "Tous",
  "Grossesse",
  "Allaitement",
  "B\u00e9b\u00e9",
  "Post-partum",
  "Bien-\u00eatre",
];

interface Props {
  searchParams: Promise<{ page?: string; q?: string; cat?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam, q, cat } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image_url, published_at", {
      count: "exact",
    })
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (q) {
    query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`);
  }

  const { data: allPosts, count: totalCount } = await query;

  const posts = allPosts ?? [];
  const featuredPost = !q && !cat && currentPage === 1 ? posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;

  // Pagination
  const totalGridPosts = gridPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalGridPosts / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ARTICLES_PER_PAGE;
  const paginatedPosts = gridPosts.slice(
    startIdx,
    startIdx + ARTICLES_PER_PAGE,
  );

  const activeCategory = cat ?? "Tous";

  function buildUrl(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams();
    if (params.page && params.page !== "1") sp.set("page", params.page);
    if (params.q) sp.set("q", params.q);
    if (params.cat && params.cat !== "Tous") sp.set("cat", params.cat);
    const qs = sp.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-nealma-bg-warm px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedBlobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <EyebrowBadge text="Conseils p\u00e9rinatal \u00b7 Grossesse \u00b7 Allaitement \u00b7 B\u00e9b\u00e9" />
          <h1 className="mt-4 text-4xl font-heading text-nealma-text sm:text-5xl">
            Le Blog N&eacute;alma
          </h1>
          <p className="mt-6 text-lg leading-8 text-nealma-text-light">
            Des articles bienveillants pour vous accompagner &agrave; chaque
            &eacute;tape de votre parcours p&eacute;rinatal.
          </p>

          {/* Search */}
          <form
            action="/blog"
            method="GET"
            className="mx-auto mt-8 flex max-w-md gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-nealma-text-light/50" />
              <Input
                type="search"
                name="q"
                placeholder="Rechercher un article..."
                defaultValue={q ?? ""}
                className="pl-9"
              />
            </div>
            <Button type="submit">Chercher</Button>
          </form>
        </div>
      </section>

      {/* Category filters */}
      <div className="border-b border-nealma-border/40 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-nealma-text-light">
            Th&egrave;mes :
          </span>
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <Link
                key={category}
                href={buildUrl({
                  cat: category === "Tous" ? undefined : category,
                  q,
                })}
                className={`inline-block rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "border-nealma-400 bg-nealma-50 font-medium text-nealma-400"
                    : "border-nealma-border text-nealma-text-light hover:border-nealma-300 hover:text-nealma-400"
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Articles */}
      <section className="bg-nealma-bg px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Search results indicator */}
          {q && (
            <div className="mb-8 flex items-center gap-3">
              <p className="text-nealma-text-light">
                {posts.length} r&eacute;sultat{posts.length !== 1 ? "s" : ""}{" "}
                pour &laquo;&nbsp;{q}&nbsp;&raquo;
              </p>
              <Link
                href="/blog"
                className="text-sm text-nealma-400 hover:underline"
              >
                Effacer
              </Link>
            </div>
          )}

          {posts.length > 0 ? (
            <>
              {/* Featured article */}
              {featuredPost && (
                <div className="mb-12">
                  <h2 className="mb-6 border-b-2 border-dashed border-nealma-border/40 pb-3 text-lg font-heading font-bold text-nealma-text">
                    Article &agrave; la une
                  </h2>
                  <FeaturedArticle
                    title={featuredPost.title}
                    slug={featuredPost.slug}
                    excerpt={featuredPost.excerpt}
                    coverImageUrl={featuredPost.cover_image_url}
                    publishedAt={featuredPost.published_at}
                  />
                </div>
              )}

              {/* Grid */}
              {paginatedPosts.length > 0 && (
                <>
                  <h2 className="mb-6 border-b-2 border-dashed border-nealma-border/40 pb-3 text-lg font-heading font-bold text-nealma-text">
                    Tous les articles
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedPosts.map((post) => (
                      <ArticleCard
                        key={post.id}
                        title={post.title}
                        slug={post.slug}
                        excerpt={post.excerpt}
                        coverImageUrl={post.cover_image_url}
                        publishedAt={post.published_at}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="mt-12 flex items-center justify-center gap-2"
                >
                  {/* Previous */}
                  {safePage > 1 ? (
                    <Link
                      href={buildUrl({
                        page: String(safePage - 1),
                        q,
                        cat: activeCategory === "Tous" ? undefined : activeCategory,
                      })}
                      className="flex size-9 items-center justify-center rounded-md border-2 border-nealma-border text-sm transition-colors hover:border-nealma-400 hover:text-nealma-400"
                      aria-label="Page pr\u00e9c\u00e9dente"
                    >
                      &lsaquo;
                    </Link>
                  ) : (
                    <span className="flex size-9 items-center justify-center rounded-md border-2 border-nealma-border/40 text-sm text-nealma-text-light/40">
                      &lsaquo;
                    </span>
                  )}

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <Link
                        key={pageNum}
                        href={buildUrl({
                          page: String(pageNum),
                          q,
                          cat:
                            activeCategory === "Tous"
                              ? undefined
                              : activeCategory,
                        })}
                        className={`flex size-9 items-center justify-center rounded-md border-2 text-sm transition-colors ${
                          pageNum === safePage
                            ? "border-nealma-400 bg-nealma-400 font-medium text-white"
                            : "border-nealma-border hover:border-nealma-400 hover:text-nealma-400"
                        }`}
                        aria-current={
                          pageNum === safePage ? "page" : undefined
                        }
                      >
                        {pageNum}
                      </Link>
                    ),
                  )}

                  {/* Next */}
                  {safePage < totalPages ? (
                    <Link
                      href={buildUrl({
                        page: String(safePage + 1),
                        q,
                        cat: activeCategory === "Tous" ? undefined : activeCategory,
                      })}
                      className="flex size-9 items-center justify-center rounded-md border-2 border-nealma-border text-sm transition-colors hover:border-nealma-400 hover:text-nealma-400"
                      aria-label="Page suivante"
                    >
                      &rsaquo;
                    </Link>
                  ) : (
                    <span className="flex size-9 items-center justify-center rounded-md border-2 border-nealma-border/40 text-sm text-nealma-text-light/40">
                      &rsaquo;
                    </span>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-nealma-text-light">
                {q
                  ? "Aucun article ne correspond \u00e0 votre recherche."
                  : "Aucun article publi\u00e9 pour le moment. Revenez bient\u00f4t !"}
              </p>
              {q && (
                <Link
                  href="/blog"
                  className="mt-4 inline-block text-nealma-400 hover:underline"
                >
                  Voir tous les articles
                </Link>
              )}
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-16 rounded-xl border-2 border-dashed border-nealma-border/60 bg-nealma-bg-warm p-8 text-center sm:p-12">
            <h3 className="text-xl font-heading text-nealma-text sm:text-2xl">
              Recevez nos conseils par email
            </h3>
            <p className="mt-3 text-nealma-text-light">
              Nouveaux articles, conseils exclusifs et actualit&eacute;s
              N&eacute;alma directement dans votre bo&icirc;te mail.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-3">
              <Input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1"
              />
              <Button>S&apos;inscrire</Button>
            </div>
            <p className="mt-3 text-xs text-nealma-text-light/50">
              Pas de spam. D&eacute;sinscription facile &agrave; tout moment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
