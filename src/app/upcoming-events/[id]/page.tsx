import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Mail,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IEvent } from "@/lib/types/events";
import EditEventDialog from "@/components/event/EditEventDialog";
import DeleteEventDialog from "@/components/event/DeleteEventDialog";

const guidelines = [
  "Arrive 15 minutes before the schedule",
  "Bring reusable water bottle",
  "Follow coordinator instructions",
  "Safety gear and tools provided on site",
];

const EventDetailsPage = async ({params,}: {params: Promise<{ id: string }>}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/event/${id}`);
  if (!res.ok) notFound();
  const event: IEvent = await res.json();

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
              <div className="flex items-center justify-between gap-4">
        <Link
          href="/upcoming-events"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Upcoming Events
        </Link>

        <div className="flex items-center gap-3">
          <EditEventDialog event={event} />
          <DeleteEventDialog id={id} />
        </div>
      </div>

      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-xl md:h-80">
        <Image
          src={event.thumbnailUrl}
          alt={event.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-white p-6 shadow-xs">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {event.eventType}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-emerald-600" />
                {event.location}
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {event.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 text-emerald-600" />
                {event.eventDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="size-4 text-emerald-600" />
                {event.creatorEmail}
              </span>
            </div>

            <h2 className="mt-8 text-xl font-semibold text-foreground">
              About This Event
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {event.description}
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">
              Volunteer Guidelines
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {guidelines.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="size-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-xl border border-border bg-slate-50 p-5">
            <p className="text-xs text-muted-foreground">Event Category</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-600">
              {event.eventType}
            </p>

            <p className="mt-4 text-xs text-muted-foreground">Scheduled Date</p>
            <Input
              readOnly
              aria-label="Event date"
              value={event.eventDate}
              className="mt-1.5 bg-white"
            />

            <Button className="mt-5 w-full bg-emerald-600 text-white hover:bg-emerald-700">
              Join Event
              <ArrowRight />
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;