"use client";

import { useEffect, useState } from "react";
import { getBookingsByBarber } from "@/lib/api/bookings";
import { generateSlots } from "@/lib/utils";
import type { Booking } from "@/types/booking";
import holidays from "@/data/holidays.json";

const OPEN_TIME = 7;
const CLOSE_TIME= 20;

export function useTimeSlots(barberId: string, date: string) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!barberId || !date) return;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        if (holidays.includes(date)) {
          setAvailableSlots([]);
          setBookedSlots([]);
          setError("Ünnepnapokon zárva");
          return;
        }

        const day = new Date(date).getDay();
        if (day === 0) {
          setAvailableSlots([]);
          setBookedSlots([]);
          setError("Vasárnap zárva");
          return;
        }

        const bookings = await getBookingsByBarber(barberId, date);
        const alreadyBooked = bookings.map((booking: Booking) => booking.time);
        setBookedSlots(alreadyBooked);

        const allSlots = generateSlots(OPEN_TIME, CLOSE_TIME);

        const freeSlots = allSlots.filter((slot) => !alreadyBooked.includes(slot));
        setAvailableSlots(freeSlots);

      } catch (err) {
        console.error(err);
        setError("Nem sikerült lekérni az időpontokat.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [barberId, date]);

  return {
    availableSlots,
    bookedSlots,
    selectedTime,
    setSelectedTime,
    isLoading,
    error,
  };
}