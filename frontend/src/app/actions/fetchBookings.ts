"use server";

import { getBookingsByEmail } from "@/lib/api/bookings";

export async function fetchBookingsAction(email: string) {
  return getBookingsByEmail(email);
}