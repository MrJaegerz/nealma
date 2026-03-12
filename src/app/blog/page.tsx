import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/blog/article-card";

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
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-nealma-text">
          Blog
        </h1>
        <p className="mt-4 text-lg text-nealma-text-light max-w-2xl mx-auto">
          Retrouvez nos conseils et articles autour de la grossesse, de
          l&apos;allaitement et du bien-être de votre bébé.
        </p>
      </div>

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
  );
}
