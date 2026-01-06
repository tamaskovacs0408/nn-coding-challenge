import { unstable_noStore as noStore } from 'next/cache';

import { Metadata } from "next";
import { getBarbers } from "@/lib/api/barbers";
import BookingByBarberForm from "@/components/booking/BookingForm";
import "./bookings.scss";

export const metadata: Metadata = {
  title: "Booking",
  description: "Book a barber",
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ barberId: string }>;
}) {
  noStore();
  const { barberId } = await params;

  if (!barberId) {
    return (
      <section className='booking-page'>
        <h1 className='booking-page__title'>Booking</h1>
        <p className='booking-page__error'>Barber not found.</p>
      </section>
    );
  }

  const barbers = await getBarbers();
  const barber = barbers.find(b => b.id === barberId);

  if (!barber) {
    return (
      <section className='booking-page'>
        <h1 className='booking-page__title'>Booking</h1>
        <p className='booking-page__error'>Barber not found.</p>
      </section>
    );
  }

  return (
    <section className='booking-page'>
      <h1 className='booking-page__title'>Booking: {barber.name}</h1>

      <div className='booking-page__card'>
        <BookingByBarberForm barber={barber} />
      </div>
    </section>
  );
}
