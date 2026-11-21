"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const DeleteEventDialog = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleDeleteEvent = async () => {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        await res.json();
        toast.success("Event deleted successfully!");
        router.refresh();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="outline"
                        className="border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
                    >
                        <Trash2 />
                        Delete
                    </Button>
                }
            >
                Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        event from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteEvent}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteEventDialog;