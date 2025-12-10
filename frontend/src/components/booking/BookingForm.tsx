"use client";

import { useActionState } from "react";
import { createBookingAction } from "@/app/actions/createBooking";
import BookingFormField from "./BookingFormField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Barber } from "@/types/barber";
import type { BookingFormState } from "@/types/form";
import "./BookingForm.scss";

const initialState: BookingFormState = {
  success: false,
  error: null,
};

export default function BookingForm({ barber }: { barber: Barber}) {
  const [ state, formAction ] = useActionState(createBookingAction, initialState);

  if (state.success) {
    toast.success("Sikieres foglalás!");
  }

  if (state.error) {
    toast.error("Hibe történt a foglalás során.");
    console.error(state.error);
  }

  return (
    <form action={formAction} className="booking-form">
      <input type="hidden" name="barberId" value={barber.id} />

      <BookingFormField labelName="E-mail" inputType="email" inputName="email" />
      <BookingFormField labelName="Dátum" inputType="date" inputName="date" />
      <BookingFormField labelName="Időpont" inputType="time" inputName="time" />

      <Button type="submit" className="booking-form__submit">Foglalás</Button>
    </form>
  )
}