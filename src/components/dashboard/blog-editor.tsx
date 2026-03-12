"use client";

import { useCallback, useState } from "react";
import {
  Heading,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
}

interface BlogEditorProps {
  initialContent?: Partial<BlogPost>;
  onSave: (post: BlogPost) => void | Promise<void>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const toolbarActions = [
  { icon: Heading, label: "Titre", prefix: "## ", suffix: "" },
  { icon: Bold, label: "Gras", prefix: "**", suffix: "**" },
  { icon: Italic, label: "Italique", prefix: "_", suffix: "_" },
  { icon: LinkIcon, label: "Lien", prefix: "[", suffix: "](url)" },
  { icon: List, label: "Liste", prefix: "- ", suffix: "" },
] as const;

export function BlogEditor({ initialContent, onSave }: BlogEditorProps) {
  const [post, setPost] = useState<BlogPost>({
    title: initialContent?.title ?? "",
    slug: initialContent?.slug ?? "",
    excerpt: initialContent?.excerpt ?? "",
    content: initialContent?.content ?? "",
    seoTitle: initialContent?.seoTitle ?? "",
    seoDescription: initialContent?.seoDescription ?? "",
    status: initialContent?.status ?? "draft",
  });
  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  function updateField<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((prev) => {
      const next = { ...prev, [key]: value };

      // Auto-generate slug from title unless manually edited
      if (key === "title" && !slugManuallyEdited) {
        next.slug = slugify(value as string);
      }

      return next;
    });
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true);
    updateField("slug", slugify(value));
  }

  const insertFormatting = useCallback(
    (prefix: string, suffix: string) => {
      const textarea = document.getElementById(
        "blog-content",
      ) as HTMLTextAreaElement | null;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = post.content.slice(start, end);
      const replacement = `${prefix}${selected || "texte"}${suffix}`;

      const newContent =
        post.content.slice(0, start) + replacement + post.content.slice(end);

      updateField("content", newContent);

      // Restore cursor position after React re-render
      requestAnimationFrame(() => {
        textarea.focus();
        const cursorPos = start + prefix.length;
        const selEnd = cursorPos + (selected || "texte").length;
        textarea.setSelectionRange(cursorPos, selEnd);
      });
    },
    [post.content],
  );

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(post);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Meta fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="blog-title">Titre</Label>
          <Input
            id="blog-title"
            placeholder="Mon article"
            value={post.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="blog-slug">Slug</Label>
          <Input
            id="blog-slug"
            placeholder="mon-article"
            value={post.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="blog-excerpt">Extrait</Label>
        <Textarea
          id="blog-excerpt"
          placeholder="Un court résumé de l\u2019article..."
          rows={2}
          value={post.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
        />
      </div>

      {/* Content editor with tabs for mobile */}
      <div className="space-y-2">
        <Label>Contenu</Label>

        {/* Desktop: split view */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="space-y-2">
            {/* Toolbar */}
            <div className="flex gap-1 rounded-lg border bg-muted/30 p-1">
              {toolbarActions.map((action) => (
                <Button
                  key={action.label}
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  title={action.label}
                  onClick={() => insertFormatting(action.prefix, action.suffix)}
                >
                  <action.icon className="size-3.5" />
                </Button>
              ))}
            </div>
            <Textarea
              id="blog-content"
              placeholder="\u00c9crivez votre article en Markdown..."
              className="min-h-[400px] font-mono text-sm"
              value={post.content}
              onChange={(e) => updateField("content", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex h-7 items-center rounded-lg border bg-muted/30 px-3">
              <span className="text-xs font-medium text-muted-foreground">
                Aper\u00e7u
              </span>
            </div>
            <div className="min-h-[400px] rounded-md border bg-nealma-bg-warm/30 p-4">
              <article className="prose prose-sm max-w-none whitespace-pre-wrap text-nealma-text">
                {post.content || (
                  <span className="text-muted-foreground">
                    L&apos;aper\u00e7u s&apos;affichera ici...
                  </span>
                )}
              </article>
            </div>
          </div>
        </div>

        {/* Mobile: tabs */}
        <div className="lg:hidden">
          <Tabs defaultValue="edit">
            <TabsList>
              <TabsTrigger value="edit">\u00c9diteur</TabsTrigger>
              <TabsTrigger value="preview">Aper\u00e7u</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="space-y-2">
              <div className="flex gap-1 rounded-lg border bg-muted/30 p-1">
                {toolbarActions.map((action) => (
                  <Button
                    key={action.label}
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    title={action.label}
                    onClick={() =>
                      insertFormatting(action.prefix, action.suffix)
                    }
                  >
                    <action.icon className="size-3.5" />
                  </Button>
                ))}
              </div>
              <Textarea
                id="blog-content-mobile"
                placeholder="\u00c9crivez votre article en Markdown..."
                className="min-h-[300px] font-mono text-sm"
                value={post.content}
                onChange={(e) => updateField("content", e.target.value)}
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="min-h-[300px] rounded-md border bg-nealma-bg-warm/30 p-4">
                <article className="prose prose-sm max-w-none whitespace-pre-wrap text-nealma-text">
                  {post.content || (
                    <span className="text-muted-foreground">
                      L&apos;aper\u00e7u s&apos;affichera ici...
                    </span>
                  )}
                </article>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* SEO fields */}
      <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
        <h3 className="text-sm font-medium text-nealma-text">
          Référencement (SEO)
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="seo-title">Titre SEO</Label>
            <Input
              id="seo-title"
              placeholder={post.title || "Titre pour les moteurs de recherche"}
              value={post.seoTitle}
              onChange={(e) => updateField("seoTitle", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {post.seoTitle.length}/60 caractères
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="seo-description">Description SEO</Label>
            <Textarea
              id="seo-description"
              placeholder="Description pour les résultats de recherche..."
              rows={2}
              value={post.seoDescription}
              onChange={(e) => updateField("seoDescription", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {post.seoDescription.length}/160 caractères
            </p>
          </div>
        </div>
      </div>

      {/* Status and save */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full space-y-2 sm:w-48">
          <Label>Statut</Label>
          <Select
            value={post.status}
            onValueChange={(v) =>
              updateField("status", v as "draft" | "published")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="published">Publié</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSave} disabled={saving} className="sm:w-auto">
          <Save className="size-4" />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
}
