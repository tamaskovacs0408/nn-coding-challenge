"use client";

import Link from "next/link";
import type { Barber } from "@/types/barber";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "./BarbersList.scss";

const translatedDays: Record<string, string> = {
  monday: "Hétfő",
  tuesday: "Kedd",
  wednesday: "Szerda",
  thursday: "Csütörtök",
  friday: "Péntek",
  saturday: "Szombat",
}

export default function BarbersList({ barbers }: { barbers: Barber[] }) {
  return (
    <section className="barbers-list">
      {barbers.map((barber) => (
        <Card key={barber.id} className="barbers-list__card">
          <CardHeader>
            <CardTitle className="barbers-list__name">
              {barber.name}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="barbers-list__hours-label">Nyitvatartás:</p>
            <ul className="barbers-list__hours">
              {Object.entries(barber.workSchedule).map(([day, hours]) => (
                <li key={day} className="barbers-list__hours-item">
                  <span className="barbers-list__day">
                    {translatedDays[day] || day}:</span>
                  <span>{hours.start} - {hours.end}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/booking?barberId=${barber.id}`}
              className="barbers-list__cta"
            >
              Időpont foglalás
            </Link>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
