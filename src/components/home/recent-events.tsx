import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, MapPin } from "lucide-react";
import type { IEvent } from "@/lib/types/events";

async function RecentEventsList() {
  const res = await fetch("http://localhost:8000/recent-event", {
    cache: "no-store",
  });
  const events: IEvent[] = await res.json();

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((item) => (
        <article
          key={item._id}
          className="flex flex-col justify-between rounded-xl border border-border bg-white p-4 shadow-xs transition-shadow hover:shadow-md"
        >
          <div>
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <span className="absolute top-2.5 right-2.5 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
                {item.eventType}
              </span>
            </div>

            <div className="px-1 pt-4">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-emerald-600" />
                {item.location}
              </p>
              <h3 className="mt-1.5 truncate text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="size-3.5 text-emerald-600" />
                {item.eventDate}
              </p>
            </div>
          </div>

          <div className="px-1 pt-4 pb-1">
            <Link
              href={`/upcoming-events/${item._id}`}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2.5 text-xs font-semibold tracking-wide text-white uppercase transition-colors hover:bg-emerald-700"
            >
              View Event
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function RecentEventsSkeleton() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-72 animate-pulse rounded-xl border border-border bg-muted/50"
        />
      ))}
    </div>
  );
}

export function RecentEvents() {
  return (
    <section className="w-full bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">
              Join An Initiative
            </span>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Recent Upcoming Events
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore the latest community development drives happening around Rangpur
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 px-5 py-2.5 text-xs font-semibold text-emerald-600 uppercase transition-colors hover:bg-emerald-50"
          >
            All Events
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <Suspense fallback={<RecentEventsSkeleton />}>
          <RecentEventsList />
        </Suspense>
      </div>
    </section>
  );
}