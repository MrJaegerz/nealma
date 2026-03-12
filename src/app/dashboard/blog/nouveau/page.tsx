"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlogEditor } from "@/components/dashboard/blog-editor";
import { AIGenerator } from "@/components/dashboard/ai-generator";
import { Separator } from "@/components/ui/separator";

export default function NouvelArticlePage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<{
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    seoTitle?: string;
    seoDescription?: string;
    status?: "draft" | "published";
  }>({});

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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/dashboard/blog");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-nealma-text mb-8">
        Nouvel article
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BlogEditor
            initialContent={initialData}
            onSave={handleSave}
          />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-nealma-text mb-4">
            Génération IA
          </h2>
          <Separator className="mb-4" />
          <AIGenerator onUseContent={(text) => setInitialData((prev) => ({ ...prev, content: text }))} />
        </div>
      </div>
    </div>
  );
}
