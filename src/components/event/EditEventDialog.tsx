"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import type { IEvent } from "@/lib/types/events";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const eventTypes = ["Cleanup", "Plantation", "Donation", "Relief", "Healthcare"];

const EditEventDialog = ({ event }: { event: IEvent }) => {
  const [form, setForm] = useState(event);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    if (form.eventDate <= today) {
      toast.error("Event date must be in the future.");
      return;
    }
    if (!form.eventType) {
      toast.error("Please select an event type.");
      return;
    }

    const { _id, ...updatedData } = form;
    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    if (data.modifiedCount !== undefined) {
      toast.success("Event updated successfully!");
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline">
            <Pencil />
            Edit
          </Button>
        }
      />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="mt-2 rounded-xl border border-border bg-white p-6 shadow-xs"
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
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
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={form.eventDate}
                onChange={(e) => update("eventDate", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
              <Input
                id="thumbnailUrl"
                type="url"
                value={form.thumbnailUrl}
                onChange={(e) => update("thumbnailUrl", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="min-h-28"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="submit"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <CalendarCheck />
              Update Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;