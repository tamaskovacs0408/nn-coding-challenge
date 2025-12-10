"use server";

import { deleteBooking } from "@/lib/api/bookings";

export async function deleteBookingAction(formData: FormData) {
 const id = formData.get("id") as string;

 if (!id) {
  throw new Error("Missing booking id");
 }

 await deleteBooking(id);
}
