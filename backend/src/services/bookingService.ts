import { readFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

interface Booking {
  id: string;
  email: string;
  barberId: string;
  date: string;
  time: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "../data/bookings.json");

export async function loadBookings(): Promise<Booking[]> {
  try {
    const bookings = await readFile(filePath, "utf-8");
    return JSON.parse(bookings);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }
    
    if (error instanceof SyntaxError) {
      console.error("Corrupted bookings.json, falling back to empty list");
      return [];
    }
    
    throw error;
  }
}

export async function saveBookings(bookings: Booking[]): Promise<void> {
  const bookingContent = JSON.stringify(bookings, null, 2);
  await writeFile(filePath, bookingContent, "utf-8");
}

export async function createBooking(bookingData: {email: string, barberId: string, date: string, time: string}): Promise<Booking> {
  const bookings = await loadBookings();
  const { email, barberId, date, time } = bookingData;

  if (!email || !email.includes('@')) throw new Error("Invalid email");
  if (!barberId) throw new Error("Invalid barberId");
  if (!date || !time) throw new Error("Invalid datetime");

  const bookingDate = new Date(`${date}T${time}`);
  if (isNaN(bookingDate.getTime())) throw new Error("Invalid datetime");
  if (bookingDate <= new Date()) throw new Error("Past date");
  const bookingConflict = bookings.some((booking) => booking.barberId === barberId && booking.date === date && booking.time === time);

  if (bookingConflict) throw new Error("Time slot already booked");

  const newBooking: Booking = {
    id: randomUUID(),
    email,
    barberId,
    date,
    time
  };

  bookings.push(newBooking);

  await saveBookings(bookings);

  return newBooking;
}

export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  if (!email) throw new Error("Email required");

  const bookings = await loadBookings();

  return bookings.filter((booking) => booking.email === email);
}

export async function deleteBooking(id: string): Promise<void> {
  if (!id) throw new Error("Id required");

  const bookings = await loadBookings();

  const existedBooking = bookings.some((booking) => booking.id === id);

  if (!existedBooking) throw new Error("Booking not found");

  const updatedBookings = bookings.filter((booking) => booking.id !== id);

  await saveBookings(updatedBookings);
}