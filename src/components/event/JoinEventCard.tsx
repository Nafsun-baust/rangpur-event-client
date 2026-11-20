"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IEvent } from "@/lib/types/events";
import { authClient } from "@/lib/auth-client";

const JoinEventCard = ({ event }: { event: IEvent }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [joined, setJoined] = useState(false);
  const router = useRouter();

  const handleJoinEvent = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const { _id, ...eventData } = event;

    const data = {
      eventId: _id,
      username: user?.name,
      email: user?.email,
      image: user?.image,
      ...eventData,
      joinedDate: new Date(),
    };

    const res = await fetch("http://localhost:8000/join-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.insertedId) {
      setJoined(true);
    }
  };

  return (
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

      <Button
        onClick={handleJoinEvent}
        disabled={joined}
        className="mt-5 w-full bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {joined ? (
          <>
            Joined
            <Check />
          </>
        ) : (
          <>
            Join Event
            <ArrowRight />
          </>
        )}
      </Button>
    </aside>
  );
};

export default JoinEventCard;