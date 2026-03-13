import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article
      className={[
        "prose prose-lg max-w-none",
        // Headings
        "prose-headings:font-heading prose-headings:text-nealma-text",
        "prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-bold prose-h2:border-b prose-h2:border-nealma-border/30 prose-h2:pb-2",
        "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:font-semibold",
        "prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-lg prose-h4:font-semibold",
        // Body text
        "prose-p:text-nealma-text-light prose-p:leading-relaxed prose-p:mb-4",
        // Links
        "prose-a:text-nealma-400 prose-a:no-underline hover:prose-a:underline",
        // Lists
        "prose-ul:my-4 prose-ul:space-y-2 prose-ol:my-4 prose-ol:space-y-2",
        "prose-li:text-nealma-text-light prose-li:leading-relaxed",
        // Other
        "prose-strong:text-nealma-text prose-img:rounded-xl",
        "prose-hr:my-10 prose-hr:border-nealma-border/30",
        "prose-blockquote:border-nealma-300 prose-blockquote:text-nealma-text-light prose-blockquote:italic",
      ].join(" ")}
    >
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
        {content}
      </Markdown>
    </article>
  );
}
