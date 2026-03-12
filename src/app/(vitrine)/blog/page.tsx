import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/blog/article-card";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils et articles sur la grossesse, l'allaitement, les soins du bébé et le bien-être périnatal par Néalma, infirmière spécialisée.",
};

export const revalidate = 3600;

const categories = ["Tous", "Grossesse", "Allaitement", "Bébé", "Post-partum"];

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image_url, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-nealma-bg-warm py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedBlobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-heading text-nealma-text sm:text-5xl">
            Blog
          </h1>
          <p className="mt-6 text-lg leading-8 text-nealma-text-light">
            Conseils et articles sur la grossesse, l&apos;allaitement, les soins
            du bébé et le bien-être périnatal.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <div className="border-b border-nealma-border/40 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-nealma-text-light">
            Filtrer par :
          </span>
          {categories.map((category) => (
            <span
              key={category}
              className={`inline-block cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors ${
                category === "Tous"
                  ? "border-nealma-400 bg-nealma-50 text-nealma-400"
                  : "border-nealma-border text-nealma-text-light hover:border-nealma-300 hover:text-nealma-400"
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Articles */}
      <section className="bg-nealma-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {posts && posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
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
          ) : (
            <div className="text-center py-16">
              <p className="text-nealma-text-light text-lg">
                Aucun article publié pour le moment. Revenez bientôt !
              </p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 rounded-xl border border-nealma-border bg-nealma-bg-warm p-8 text-center sm:p-12">
            <h3 className="text-xl font-heading text-nealma-text sm:text-2xl">
              Recevez nos conseils par email
            </h3>
            <p className="mt-3 text-nealma-text-light">
              Inscrivez-vous pour recevoir nos nouveaux articles directement dans
              votre boîte mail.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-3">
              <Input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1"
              />
              <Button>S&apos;inscrire</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
