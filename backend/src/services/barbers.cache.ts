import { db } from "../db/index.js";
import { barbers } from "../db/schema/barbers.js";
import type { Barber } from "../types/barbers.js"

let cachedBarbers: Barber[] = [];

export async function cacheBarbers() {
  const rows = await db.select().from(barbers);

  cachedBarbers = rows.map(row => ({
    id: row.id,
    name: row.name,
    workSchedule: row.workSchedule as Barber['workSchedule'],
  }));
}

export function getCachedBarbers() {
  return cachedBarbers;
}