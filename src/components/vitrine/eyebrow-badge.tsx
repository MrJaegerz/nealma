interface EyebrowBadgeProps {
  text: string;
}

export function EyebrowBadge({ text }: EyebrowBadgeProps) {
  return (
    <span className="inline-block rounded-full border border-nealma-border bg-white/60 px-4 py-1.5 text-sm text-nealma-text-light backdrop-blur">
      {text}
    </span>
  );
}
