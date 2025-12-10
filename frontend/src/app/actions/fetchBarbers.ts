"use server";

import { getBarbers } from "@/lib/api/barbers";

export async function fetchBarbersAction() {
  return getBarbers();
}