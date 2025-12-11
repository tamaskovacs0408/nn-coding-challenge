import { Spinner } from "@/components/ui/spinner";
import "./loading.scss";

export default function Loading() {
  return (
    <section className="app-loading">
      <Spinner className="app-loading__spinner" />
      <p className="app-loading__text">Betöltés...</p>
    </section>
  )
}