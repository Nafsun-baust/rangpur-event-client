"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import type { IEvent } from "@/lib/types/events";

export function Events({ events }: { events: IEvent[] }) {
  return (
    <section className="w-full bg-slate-50 px-6 py-12 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Explore Upcoming Events
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join social development and community service initiatives in Rangpur
        </p>

        <p className="mt-5 text-sm text-muted-foreground">
          Showing {events.length} events
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <span className="absolute top-2.5 right-2.5 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-xs">
                    {item.eventType}
                  </span>
                </div>

                <div className="px-1 pt-4">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-emerald-600" />
                    {item.location}
                  </p>
                  <h2 className="mt-1.5 truncate text-lg font-semibold text-foreground">
                    {item.title}
                  </h2>
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
      </div>
    </section>
  );
}