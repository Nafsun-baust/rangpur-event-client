import { Suspense } from "react";
import { Events } from "@/components/event/events";
import type { IEvent } from "@/lib/types/events";


async function UpcomingEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`, {
    cache: "no-store",
  });
  const data: IEvent[] = await res.json();

  return <Events events={data} />;
}

function EventsSkeleton() {
  return (
    <section className="w-full bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="h-10 w-80 max-w-full animate-pulse rounded-md bg-muted" />
        <div className="mt-3 h-4 w-64 max-w-full animate-pulse rounded-md bg-muted" />
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

export default function AllUpcomingEventsPage() {
  return (
    <main>
      <Suspense fallback={<EventsSkeleton />}>
        <UpcomingEvents />
      </Suspense>
    </main>
  );
}