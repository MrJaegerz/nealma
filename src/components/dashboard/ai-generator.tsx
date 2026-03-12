"use client";

import { useCallback, useRef, useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Provider = "claude" | "openai" | "gemini" | "deepseek";

const providers: { value: Provider; label: string }[] = [
  { value: "claude", label: "Claude (Anthropic)" },
  { value: "openai", label: "OpenAI" },
  { value: "gemini", label: "Gemini (Google)" },
  { value: "deepseek", label: "DeepSeek" },
];

interface AIGeneratorProps {
  onUseContent?: (content: string) => void;
}

export function AIGenerator({ onUseContent }: AIGeneratorProps) {
  const [provider, setProvider] = useState<Provider>("claude");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(async () => {
    if (!prompt.trim() || loading) return;

    // Abort any previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, prompt }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const error = await response.text();
        setOutput(`Erreur : ${error}`);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setOutput("Erreur : pas de flux de réponse.");
        return;
      }

      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setOutput(result);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setOutput(
          `Erreur : ${(err as Error).message || "Une erreur est survenue."}`,
        );
      }
    } finally {
      setLoading(false);
    }
  }, [prompt, provider, loading]);

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleUseContent() {
    onUseContent?.(output);
  }

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-nealma-400" />
        <h3 className="text-sm font-medium text-nealma-text">Générateur IA</h3>
      </div>

      {/* Provider selector */}
      <div className="space-y-2">
        <Label>Modèle</Label>
        <Select
          value={provider}
          onValueChange={(v) => setProvider(v as Provider)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {providers.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Prompt */}
      <div className="space-y-2">
        <Label htmlFor="ai-prompt">Sujet / Prompt</Label>
        <Textarea
          id="ai-prompt"
          placeholder="Décrivez le contenu que vous souhaitez générer..."
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Generate button */}
      <Button
        onClick={generate}
        disabled={loading || !prompt.trim()}
        className="w-full"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Génération en cours...
          </span>
        ) : (
          <>
            <Sparkles className="size-4" />
            Générer
          </>
        )}
      </Button>

      {/* Output */}
      {output && (
        <div className="space-y-3">
          <div
            className={cn(
              "max-h-96 overflow-y-auto rounded-md border bg-nealma-bg-warm/30 p-4",
              loading && "animate-pulse",
            )}
          >
            <article className="prose prose-sm max-w-none whitespace-pre-wrap text-nealma-text">
              {output}
            </article>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {copied ? "Copié" : "Copier"}
            </Button>
            {onUseContent && (
              <Button size="sm" onClick={handleUseContent} disabled={loading}>
                Utiliser ce contenu
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
