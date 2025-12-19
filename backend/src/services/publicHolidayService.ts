import type { PublicHolidays } from "../types/publicHolidays.ts";
import { apiFetch } from "../lib/utils.js";

async function fetchPublicHolidays(year: string): Promise<PublicHolidays[]> {
  const url = process.env.PUBLIC_HOLIDAY_API_URL!;

  const publicHolidays: PublicHolidays[] = await apiFetch(`${url}/${year}/HU`);

  return publicHolidays;
}

export default fetchPublicHolidays;