import { fetchBarbersAction } from "@/app/actions/fetchBarbers";
import BarbersList from "@/components/barbers/BarbersList";
import "./barbers.scss";

export default async function BarbersPage() {
  const barbers = await fetchBarbersAction();

  return (
    <main className="barbers-page">
      <h1 className="barbers-page__title">Borbélyaink</h1>
      <BarbersList barbers={barbers} />
    </main>
  );
}
