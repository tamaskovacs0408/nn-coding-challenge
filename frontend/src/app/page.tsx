import Link from "next/link";
import { Scissors, Calendar, Clock, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FeatureCard from "@/components/landing/FeatureCard";
import ActionCard from "@/components/landing/ActionCard";
import "./home.scss";

export default function HomePage() {
  return (
    <main className='home'>
      <section className='home__hero'>
        <h1 className='home__title'>Foglalj időpontot egyszerűen!</h1>
        <p className='home__subtitle'>
          Válaszd ki kedvenc borbélyodat és foglalj azonnal!
        </p>

        <Link href='/barbers' className='home__cta'>
          Foglalj most!
        </Link>
      </section>

      <section className='home__features'>
        <FeatureCard icon={Scissors} text='Profi borbélyok' />
        <FeatureCard icon={Calendar} text='Gyors foglalás' />
        <FeatureCard icon={Clock} text='Rugalmas időpontok' />
        <FeatureCard icon={Star} text='Minőségi szolgáltatás' />
      </section>

      <section className='home__actions'>
        <ActionCard
          title='Új foglalás'
          btnTitle='Borbély kiválasztása'
          url='/barbers'
        />
        <ActionCard
          title='Foglalásaim'
          btnTitle='Foglalások megtekintése'
          url='/barbers'
        />
      </section>
    </main>
  );
}
