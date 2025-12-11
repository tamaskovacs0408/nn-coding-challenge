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
      toast.success("Foglalás sikeresen törölve.");
      router.refresh();
    } else {
      toast.error(response.message || "Hiba történt a foglalás törlése során.");
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
          <DialogTitle>Biztosan törlöd a foglalást?</DialogTitle>
        </DialogHeader>
        <p>Ez a művelete nem vonható vissza.</p>
        <DialogFooter className="booking-delete-buttons">
          <DialogClose asChild>
            <Button variant="secondary">Mégsem</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>Törlés</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
