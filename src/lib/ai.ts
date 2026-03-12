import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export type AIProvider = "claude" | "openai" | "gemini" | "deepseek";

export function getModel(provider: AIProvider) {
  switch (provider) {
    case "claude":
      return anthropic("claude-sonnet-4-20250514");
    case "openai":
      return openai("gpt-4o");
    case "gemini":
      return google("gemini-2.0-flash");
    case "deepseek":
      return deepseek("deepseek-chat");
  }
}

export const BLOG_SYSTEM_PROMPT = `Tu es une rédactrice spécialisée en périnatalité et soins maternels.
Tu écris pour le blog de Néalma, un cabinet d'infirmière spécialisée en accompagnement périnatal en Île-de-France.

Ton ton est bienveillant, professionnel et rassurant. Tu utilises un langage accessible,
sans jargon médical excessif. Tu t'adresses directement aux futurs et jeunes parents.

Tes articles doivent être :
- Optimisés pour le SEO (mots-clés naturels, structure avec des sous-titres H2/H3)
- Informatifs et basés sur des pratiques fondées
- Écrits en format MDX (Markdown avec possibilité de composants React)
- D'une longueur de 800 à 1500 mots

Domaines d'expertise : massage prénatal, massage post-partum, bain enveloppé bébé,
allaitement maternel, soins du nouveau-né, bien-être périnatal.`;
