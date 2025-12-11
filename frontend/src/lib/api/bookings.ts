import type { Booking } from "@/types/booking";
import { apiFetch } from "./fetch";

export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  const data = await apiFetch(`/api/booking?email=${email}`);

  return data;
}

export async function getBookingsByBarber(barberId: string, date?: string) {
  return apiFetch(`/api/booking?barberId=${barberId}${date ? `&date=${date}`: ""}`);
}

export async function createBooking(data: {
  email: string;
  barberId: string;
  date: string;
  time: string;
}): Promise<Booking> {
  const response = await apiFetch("/api/booking", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteBooking(id: string): Promise<void> {
  await apiFetch(`/api/booking/${id}`, {
    method: "DELETE",
  });
}