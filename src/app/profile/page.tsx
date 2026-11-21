"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [nameInput, setNameInput] = useState<string | null>(null);
  const [imageInput, setImageInput] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const name = nameInput ?? user?.name ?? "";
  const image = imageInput ?? user?.image ?? "";

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim(),
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || "Failed to update profile.");
      return;
    }

    toast.success("Profile updated successfully!");
    router.refresh();
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-72 animate-pulse rounded-xl border border-border bg-muted/50" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          View and update your display name and profile picture.
        </p>

        <div className="mt-8 rounded-xl border border-border bg-white p-8 shadow-xs">
          <div className="flex items-center gap-4 border-b border-border pb-6">
            <Avatar className="size-16">
              <AvatarImage referrerPolicy="no-referrer" src={image || undefined} />
              <AvatarFallback className="bg-emerald-600 text-lg font-semibold text-white">
                {name?.charAt(0) || user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {user?.name}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="mt-6 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setNameInput(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Profile Picture URL</Label>
              <Input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={saving}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Save />
                {saving ? "Saving..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
