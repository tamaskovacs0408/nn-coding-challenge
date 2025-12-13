"use client";

import { useActionState, useState } from "react";
import { createBookingAction } from "@/app/actions/createBooking";
import { useRouter } from "next/navigation";
import BookingFormField from "./BookingFormField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Barber } from "@/types/barber";
import type { BookingFormState } from "@/types/form";
import "./BookingForm.scss";
import BookingDateTimePicker from "./BookingDateTimePicker";

const initialState: BookingFormState = {
  success: false,
  error: null,
};

export default function BookingForm({ barber }: { barber: Barber }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [state, formAction] = useActionState(createBookingAction, initialState);

  const router = useRouter();

  const isDisabled = !date || !time;

  if (state.success) {
    toast.success("Sikeres foglalás!");

    setTimeout(() => {
      router.push("/bookings");
    }, 1000);
  }

  if (state.error) {
    toast.error("Hiba történt a foglalás során.");
    console.error(state.error);
  }

  return (
    <form
      action={formAction}
      className='booking-form'
    >
      <input type='hidden' name='barberId' value={barber.id} />
      <input type='hidden' name='date' value={date} />
      <input type='hidden' name='time' value={time} />

      <BookingFormField
        labelName='E-mail'
        inputType='email'
        inputName='email'
      />

      <BookingDateTimePicker
        barberId={barber.id}
        onSelect={(selectedDate, selectedTime) => {
          setDate(selectedDate);
          setTime(selectedTime);
        }}
      />

      <Button
        type='submit'
        className='booking-form__submit'
        disabled={isDisabled}
      >
        Foglalás
      </Button>
    </form>
  );
}
