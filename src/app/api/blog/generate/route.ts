import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createClient } from "@/lib/supabase/server";
import { getModel, BLOG_SYSTEM_PROMPT, type AIProvider } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Non autorisé", { status: 401 });
  }

  const { prompt, provider = "claude" } = await req.json();

  if (!prompt) {
    return new Response("Prompt requis", { status: 400 });
  }

  const model = getModel(provider as AIProvider);

  const result = streamText({
    model,
    system: BLOG_SYSTEM_PROMPT,
    prompt: `Écris un article de blog complet en Markdown sur le sujet suivant :\n\n${prompt}`,
  });

  return result.toTextStreamResponse();
}
