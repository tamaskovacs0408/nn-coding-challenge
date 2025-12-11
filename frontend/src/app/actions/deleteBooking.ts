"use server";

import { deleteBooking } from "@/lib/api/bookings";

export async function deleteBookingAction(bookingId: string) {
  try {
    await deleteBooking(bookingId);
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ismeretlen hiba";

    return { success: false, message}
  }
}