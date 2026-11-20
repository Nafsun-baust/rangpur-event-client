"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const eventTypes = ["Cleanup", "Plantation", "Donation", "Relief", "Healthcare"];

const initialForm = {
    title: "",
    location: "",
    eventType: "",
    eventDate: "",
    thumbnailUrl: "",
    description: "",
};

export default function CreateEventPage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [form, setForm] = useState(initialForm);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    const update = (field: keyof typeof form, value: string) =>
        setForm((current) => ({ ...current, [field]: value }));

    const handleEventcreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const today = new Date().toISOString().split("T")[0];
        if (form.eventDate <= today) {
            setErrorMsg("Past dates are not allowed. Please select a future date.");
            return;
        }

        const token = await getTokenFromClient();

        const res = await fetch("http://localhost:8000/create-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...form,
                creatorEmail: user?.email,
            }),
        });

        const data = await res.json();
        if (data.insertedId) {
            setSuccessMsg("Event created successfully! Redirecting...");
            setForm(initialForm);
            setTimeout(() => {
                router.push("/upcoming-events");
            }, 1000);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Create Social Development Event
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Fill in the details below to organize a new service event in Rangpur.
                </p>

                <form
                    onSubmit={handleEventcreate}
                    className="mt-8 rounded-xl border border-border bg-white p-8 shadow-xs"
                >
                    {errorMsg && (
                        <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-600">
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div className="mb-4 rounded-md bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs text-emerald-700">
                            {successMsg}
                        </div>
                    )}

                    <div className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Event Title</Label>
                            <Input
                                id="title"
                                placeholder="name of your event"
                                value={form.title}
                                onChange={(event) => update("title", event.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="mordern, rangpur"
                                    value={form.location}
                                    onChange={(event) => update("location", event.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Event Type</Label>
                                <Select
                                    value={form.eventType}
                                    onValueChange={(value) => update("eventType", value ?? "")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {eventTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="eventDate">Event Date (Future Date Only)</Label>
                            <Input
                                id="eventDate"
                                type="date"
                                min={tomorrow}
                                value={form.eventDate}
                                onChange={(event) => update("eventDate", event.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="thumbnailUrl">Your Image URL</Label>
                            <Input
                                id="thumbnailUrl"
                                type="url"
                                placeholder="insert image url of your event"
                                value={form.thumbnailUrl}
                                onChange={(event) => update("thumbnailUrl", event.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="write full details of your events"
                                className="min-h-32"
                                value={form.description}
                                onChange={(event) => update("description", event.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setForm(initialForm)}
                        >
                            <RotateCcw />
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            className="bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            <CalendarPlus />
                            Create Event
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}