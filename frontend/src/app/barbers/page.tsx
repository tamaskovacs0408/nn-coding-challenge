import { unstable_noStore as noStore } from 'next/cache';

import { Metadata } from "next";
import { getBarbers } from "@/lib/api/barbers";
import BarbersList from "@/components/barbers/BarbersList";
import "./barbers.scss";

export const metadata: Metadata = {
  title: "Borbélyaink",
  description: "Borbélyaink megtekintése",
}

export default async function BarbersPage() {
  noStore();
  const barbers = await getBarbers();

  return (
    <main className="barbers-page">
      <h1 className="barbers-page__title">Borbélyaink</h1>
      <BarbersList barbers={barbers} />
    </main>
  );
}
