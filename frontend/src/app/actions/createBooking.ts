"use server";

import { createBooking } from "@/lib/api/bookings";
import type { BookingFormState } from "@/types/form";

export async function createBookingAction(
  prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  try {
    const email = formData.get("email") as string;
    const barberId = formData.get("barberId") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    await createBooking({ email, barberId, date, time });
    return { success: true, error: null };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Unknown error" };
  }
}
