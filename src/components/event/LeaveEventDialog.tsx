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
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const LeaveEventDialog = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleLeaveEvent = async () => {
    const token = await getTokenFromClient();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      toast.error("Failed to leave event.");
      return;
    }
    toast.success("You have left the event.");
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
            <LogOut className="size-4" />
            Leave Event
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave this event?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your participation in this event?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLeaveEvent}>
            Yes, Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveEventDialog;
