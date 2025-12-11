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
        
        const bookings = await getBookingsByBarber(barberId, date);
        const alreadyBooked = bookings.map((booking: Booking) => booking.time);
        setBookedSlots(alreadyBooked);

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


        const allSlots = generateSlots(OPEN_TIME, CLOSE_TIME);

        let freeSlots = allSlots.filter((slot) => !alreadyBooked.includes(slot));

        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);

        if (selected.getTime() === today.getTime()) {
          const currentMinutes = now.getHours() * 60 + now.getMinutes();

          freeSlots = freeSlots.filter((slot) => {
            const [hour, minute] = slot.split(":").map(Number);
            const slotMinutes = hour * 60 + minute;

            return slotMinutes > currentMinutes
          })

          if (freeSlots.length === 0) {
            setError("A mai napra már nincs szabad időpont.")
          }
        }

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