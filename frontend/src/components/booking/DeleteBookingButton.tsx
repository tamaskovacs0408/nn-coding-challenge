"use client";

import { useTransition } from "react";
import { deleteBookingAction } from "@/app/actions/deleteBooking";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import "./DeleteBookingButton.scss";

export default function DeleteBookingButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const [open, setOpen] = useTransition();
  const router = useRouter();

  async function handleDelete() {
    const response = await deleteBookingAction(bookingId);

    if (response.success) {
      toast.success("Booking successfully deleted.");
      router.refresh();
    } else {
      toast.error(response.message || "An error occurred while deleting the booking.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' className="booking-delete-btn">
          <Trash2 size={32} />
        </Button>
      </DialogTrigger>
      <DialogContent className="booking-delete-content">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete the booking?</DialogTitle>
        </DialogHeader>
        <p>This action cannot be undone.</p>
        <DialogFooter className="booking-delete-buttons">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
