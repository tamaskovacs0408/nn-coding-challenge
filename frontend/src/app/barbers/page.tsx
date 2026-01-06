"use cache";

import { Metadata } from "next";
import { getBarbers } from "@/lib/api/barbers";
import BarbersList from "@/components/barbers/BarbersList";
import "./barbers.scss";

export const metadata: Metadata = {
  title: "Our Barbers",
  description: "Check our barbers",
}

export default async function BarbersPage() {
  const barbers = await getBarbers();

  return (
    <main className="barbers-page">
      <h1 className="barbers-page__title">Our Barbers</h1>
      <BarbersList barbers={barbers} />
    </main>
  );
}
