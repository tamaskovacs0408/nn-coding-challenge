"use client";

import { useEffect, useState, useMemo } from "react";
import {
  generateSlots,
  isHoliday,
  isSunday,
  isToday,
  toMinutes,
  getNowMinutes,
} from "@/lib/utils";
import type { Booking } from "@/types/booking";
import holidays from "@/data/holidays.json";

const OPEN_TIME = 7;
const CLOSE_TIME = 20;

export function useTimeSlots(barberId: string, date: string) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableSlots = useMemo(() => {
    if (isHoliday(holidays, date) || isSunday(date)) return [];

    const allSlots = generateSlots(OPEN_TIME, CLOSE_TIME);

    let freeSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    if (isToday(date)) {
      const now = getNowMinutes();
      freeSlots = freeSlots.filter(freeSlot => toMinutes(freeSlot) > now);
    }

    return freeSlots;
  }, [date, bookedSlots]);

  useEffect(() => {
    setSelectedTime("");
  }, [date]);

  useEffect(() => {
    if (!barberId || !date) return;

    async function fetchBookedSlots() {
      try {
        setIsLoading(true);
        setError(null);

        if (isHoliday(holidays, date)) {
          setBookedSlots([]);
          setError("Ünnepnapokon zárva");
          return;
        }

        if (isSunday(date)) {
          setBookedSlots([]);
          setError("Vasárnap zárva");
          return;
        }

        const proxyUrl = `/api/proxy/bookings?barberId=${encodeURIComponent(
          barberId
        )}${date ? `&date=${encodeURIComponent(date)}` : ""}`;

        const res = await fetch(proxyUrl, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to load bookings (status ${res.status})`);
        }

        const bookings: Booking[] = await res.json();
        const alreadyBooked = bookings.map((booking: Booking) => booking.time);
        setBookedSlots(alreadyBooked);
      } catch (err) {
        console.error(err);
        setError("Nem sikerült lekérni az időpontokat.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookedSlots();
  }, [barberId, date]);

  useEffect(() => {
    if (isToday(date) && availableSlots.length === 0) {
      setError("A mai napra már nincs szabad időpont.");
    }
  }, [date, availableSlots]);

  return {
    availableSlots,
    bookedSlots,
    selectedTime,
    setSelectedTime,
    isLoading,
    error,
  };
}
