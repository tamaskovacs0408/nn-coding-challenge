import { Metadata } from "next";
import { fetchBookingsAction } from "../actions/fetchBookings";
import { getBarbers } from "@/lib/api/barbers";
import Link from "next/link";
import DeleteBookingButton from "@/components/booking/DeleteBookingButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Calendar, Clock, Mail, Trash2 } from "lucide-react";
import "./bookings.scss";

export const metadata: Metadata = {
  title: "Bookings",
  description: "View bookings",
};

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string}>
}) {
  const { email } = await searchParams;

  const bookings = email ? await fetchBookingsAction(email) : [];
  const barbers = await getBarbers();

  const bookingsWithBarberName = bookings.map((booking) => ({
    ...booking,
    barberName: barbers.find((barber) => barber.id === booking.barberId)?.name ?? ""
  }))

  const hasSearch = !!email;
  const hasResults = bookings.length > 0;

  return (
    <main className='booking-page'>
      <h1 className='booking-page__title'>My bookings</h1>
      <p className='booking-page__subtitle'>
        Enter your email address to view your bookings
      </p>

      <form className='booking-page__search'>
        <Input
          type='email'
          name='email'
          placeholder='example@email.com'
          className='booking-page__input'
          required
        />
        <Button type='submit' className='booking-page__submit'>
          <Search size={18} /> Search
        </Button>
      </form>

      {hasSearch && (
        <Button className="booking-page__reset">
          <Link href="/bookings">New search</Link>
        </Button>
      )}

      {hasSearch && !hasResults && (
        <p className="booking-page__subtitle">
          No bookings found for the provided email address.
        </p>
      )}

      {hasResults && (
        <section className="booking-page__list">
          {bookingsWithBarberName.map((booking) => (
            <Card key={booking.id} className="booking-page__card">
                <DeleteBookingButton bookingId={booking.id} />
              <CardHeader>
                <CardTitle className="booking-page__name">{booking.barberName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="booking-page__row">
                  <Calendar size={18} />
                  {booking.date}
                </div>
                <div className="booking-page__row">
                  <Clock size={18} />
                  {booking.time}
                </div>
                <div className="booking-page__row">
                  <Mail size={18} />
                  {booking.email}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}
