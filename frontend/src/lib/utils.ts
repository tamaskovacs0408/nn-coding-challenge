import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlots(openTime: number, closeTime: number) {
  const slots: string[] = [];
  for (let hour = openTime; hour < closeTime; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return slots;
}

export function isHoliday(holidays: string[],date: string,) {
  return holidays.includes(date);
}

export function isSunday(date: string) {
  return new Date(date).getDay() === 0;
}

export function isToday(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  return selected.getTime() === today.getTime();
}

export function getNowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function toMinutes(slot: string) {
  const [h, m] = slot.split(":").map(Number);
  return h * 60 + m;
}