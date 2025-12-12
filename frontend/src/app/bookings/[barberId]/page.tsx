import { unstable_noStore as noStore } from 'next/cache';

import { Metadata } from "next";
import { getBarbers } from "@/lib/api/barbers";
import BookingByBarberForm from "@/components/booking/BookingForm";
import "./bookings.scss";

export const metadata: Metadata = {
  title: "Foglalás",
  description: "Foglalás borbélyhoz",
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
        <h1 className='booking-page__title'>Foglalás</h1>
        <p className='booking-page__error'>A borbély nem található.</p>
      </section>
    );
  }

  const barbers = await getBarbers();
  const barber = barbers.find(b => b.id === barberId);

  if (!barber) {
    return (
      <section className='booking-page'>
        <h1 className='booking-page__title'>Foglalás</h1>
        <p className='booking-page__error'>A borbély nem található.</p>
      </section>
    );
  }

  return (
    <section className='booking-page'>
      <h1 className='booking-page__title'>Foglalás: {barber.name}</h1>

      <div className='booking-page__card'>
        <BookingByBarberForm barber={barber} />
      </div>
    </section>
  );
}
