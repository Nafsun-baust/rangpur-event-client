import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { Calendar, Eye, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IEvent } from "@/lib/types/events";

const JoinedEventsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const res = await fetch(`http://localhost:8000/joined-events/${user?.email}`, {
    cache: "no-store",
  });
  const events: (IEvent & { eventId?: string })[] = await res.json();

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4 md:px-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Joined Events</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          All community events you have joined, sorted by event date
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {events.map((item) => (
          <Card
            key={item._id}
            className="overflow-hidden shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-72 h-48 shrink-0 relative">
                <Image
                  height={400}
                  width={400}
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <span className="rounded bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {item.eventType}
                  </span>
                  <h2 className="mt-2 text-2xl font-medium text-foreground">
                    {item.title}
                  </h2>

                  <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-emerald-600" />
                      <span>Event Date: {item.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-emerald-600" />
                      <span>Location: {item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Link href={`/upcoming-events/${item.eventId || item._id}`}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                      <Eye className="size-4" />
                      View Event
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JoinedEventsPage;