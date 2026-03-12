import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/blog/article-card";
import { AnimatedBlobs } from "@/components/ui/animated-blobs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils et articles sur la grossesse, l'allaitement, les soins du bébé et le bien-être périnatal par Néalma, infirmière spécialisée.",
};

export const revalidate = 3600;

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
            Retrouvez nos conseils et articles autour de la grossesse, de
            l&apos;allaitement et du bien-être de votre bébé.
          </p>
        </div>
      </section>

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
        </div>
      </section>
    </>
  );
}
