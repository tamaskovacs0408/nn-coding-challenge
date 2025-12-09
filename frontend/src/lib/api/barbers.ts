import type { Barber } from "@/types/barber";
import { apiFetch } from "./fetch";

export async function getBarbers(): Promise<Barber[]> {
  const data = await apiFetch("/api/barbers");

  return data;
}