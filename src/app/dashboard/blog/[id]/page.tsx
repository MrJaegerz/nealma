"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { BlogEditor } from "@/components/dashboard/blog-editor";
import { AIGenerator } from "@/components/dashboard/ai-generator";
import { Separator } from "@/components/ui/separator";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seo_title: string;
  seo_description: string;
  status: string;
  ai_provider: string | null;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/blog?status=`);
      if (res.ok) {
        const posts = await res.json();
        const found = posts.find((p: Post) => p.id === params.id);
        if (found) {
          setPost(found);
        }
      }
    }
    fetchPost();
  }, [params.id]);

  async function handleSave(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    seoTitle: string;
    seoDescription: string;
    status: string;
    aiProvider?: string;
  }) {
    const res = await fetch("/api/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: params.id, ...data }),
    });

    if (res.ok) {
      router.push("/dashboard/blog");
    }
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-nealma-text mb-8">
        Modifier l&apos;article
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BlogEditor
            initialContent={{
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              content: post.content,
              seoTitle: post.seo_title,
              seoDescription: post.seo_description,
              status: post.status as "draft" | "published",
            }}
            onSave={handleSave}
          />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-nealma-text mb-4">
            Génération IA
          </h2>
          <Separator className="mb-4" />
          <AIGenerator onUseContent={(text) => setPost((prev) => prev ? { ...prev, content: text } : prev)} />
        </div>
      </div>
    </div>
  );
}
