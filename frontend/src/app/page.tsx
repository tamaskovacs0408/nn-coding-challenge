import Link from "next/link";
import { Scissors, Calendar, Clock, Star } from "lucide-react";
import FeatureCard from "@/components/landing/FeatureCard";
import ActionCard from "@/components/landing/ActionCard";
import "./home.scss";

export default function HomePage() {
  return (
    <main className='home'>
      <section className='home__hero'>
        <h1 className='home__title'>Book an appointment easily!</h1>
        <p className='home__subtitle'>
          Choose your favorite barber and book instantly!
        </p>

        <Link href='/barbers' className='home__cta'>
          Book now!
        </Link>
      </section>

      <section className='home__features'>
        <FeatureCard icon={Scissors} text='Professional barbers' />
        <FeatureCard icon={Calendar} text='Fast booking' />
        <FeatureCard icon={Clock} text='Flexible time slots' />
        <FeatureCard icon={Star} text='Quality service' />
      </section>

      <section className='home__actions'>
        <ActionCard
          title='New booking'
          btnTitle='Choose a barber'
          url='/barbers'
        />
        <ActionCard
          title='My bookings'
          btnTitle='View bookings'
          url='/bookings'
        />
      </section>
    </main>
  );
}
