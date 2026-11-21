import Image from "next/image";
import { headers } from "next/headers";
import { Calendar, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { Card } from "@/components/ui/card";
import EditEventDialog from "@/components/event/EditEventDialog";
import DeleteEventDialog from "@/components/event/DeleteEventDialog";
import type { IEvent } from "@/lib/types/events";

const ManageEventsPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    const token = await getTokenFromServer();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manage-events/${user?.email}`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const events: IEvent[] = res.ok ? await res.json() : [];

    return (
        <div className="container mx-auto max-w-5xl py-10 px-4 md:px-6 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight">Manage Events</h1>
                <p className="text-muted-foreground mt-2 text-sm">
                    Update or delete social development events created by you
                </p>
            </div>

            <div className="flex flex-col gap-6">
                {events.map((item) => (
                    <Card
                        key={item._id}
                        className="overflow-hidden p-0 shadow-xs hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-72 h-52 shrink-0 relative">
                                <Image
                                    fill
                                    src={item.thumbnailUrl}
                                    alt={item.title}
                                    className="object-cover"
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
                                    <EditEventDialog event={item} />
                                    <DeleteEventDialog id={item._id} />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageEventsPage;