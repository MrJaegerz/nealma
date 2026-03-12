export function AnimatedBlobs() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-nealma-100/60 blur-3xl animate-blob-drift-1"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-0 h-[320px] w-[320px] rounded-full bg-nealma-green-100/40 blur-3xl animate-blob-drift-2"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-nealma-200/30 blur-2xl animate-blob-drift-3"
      />
    </>
  );
}
