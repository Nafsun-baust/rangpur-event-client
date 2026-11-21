export default function Loading() {
  return (
    <section className="min-h-screen w-full bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="h-9 w-72 max-w-full animate-pulse rounded-md bg-muted" />
        <div className="mt-3 h-4 w-56 max-w-full animate-pulse rounded-md bg-muted" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-xl border border-border bg-muted/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
