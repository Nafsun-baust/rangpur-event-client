"use client";
import { useState } from "react";
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

const eventTypes = ["Cleanup", "Plantation", "Donation", "Relief", "Healthcare"];

const initialForm = {
    title: "",
    location: "",
    eventType: "",
    eventDate: "",
    thumbnailUrl: "",
    description: "",
    creatorEmail: "",
};

export default function CreateEventPage() {
    const [form, setForm] = useState(initialForm);

    const update = (field: keyof typeof form, value: string) =>
        setForm((current) => ({ ...current, [field]: value }));

    const handleEventcreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch("http://localhost:8000/create-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Create Social Development Event
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Fill in the details below to organize a new service event in rangpur.
                </p>

                <form
                    onSubmit={handleEventcreate}
                    className="mt-8 rounded-xl border border-border bg-white p-8 shadow-xs"
                >
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

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="eventDate">Event Date</Label>
                                <Input
                                    id="eventDate"
                                    type="date"
                                    value={form.eventDate}
                                    onChange={(event) => update("eventDate", event.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="creatorEmail">Email</Label>
                                <Input
                                    id="creatorEmail"
                                    type="email"
                                    placeholder="event@gmail.com"
                                    value={form.creatorEmail}
                                    onChange={(event) => update("creatorEmail", event.target.value)}
                                    required
                                />
                            </div>
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
                                placeholder="write full ditails of your events"
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