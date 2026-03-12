import { MDXRemote } from "next-mdx-remote/rsc";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-nealma-text prose-p:text-nealma-text-light prose-a:text-nealma-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-nealma-text prose-img:rounded-xl">
      <MDXRemote source={content} />
    </article>
  );
}
