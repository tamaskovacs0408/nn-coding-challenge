import 'dotenv/config'
import { db } from "./index.js";
import { barbers } from "./schema/barbers.js";

await db.insert(barbers).values([
  {
    name: "Jack Morrison",
    workSchedule: {
      monday: { start: "07:00", end: "20:00" },
      tuesday: { start: "07:00", end: "20:00" },
      wednesday: { start: "07:00", end: "20:00" },
      thursday: { start: "07:00", end: "20:00" },
      friday: { start: "07:00", end: "20:00" },
      saturday: { start: "07:00", end: "20:00" },
    },
  },
  {
    name: "Oliver Brooks",
    workSchedule: {
      monday: { start: "07:00", end: "20:00" },
      tuesday: { start: "07:00", end: "20:00" },
      wednesday: { start: "07:00", end: "20:00" },
      thursday: { start: "07:00", end: "20:00" },
      friday: { start: "07:00", end: "20:00" },
      saturday: { start: "07:00", end: "20:00" },
    },
  },
  {
    name: "Liam Carter",
    workSchedule: {
      monday: { start: "07:00", end: "20:00" },
      tuesday: { start: "07:00", end: "20:00" },
      wednesday: { start: "07:00", end: "20:00" },
      thursday: { start: "07:00", end: "20:00" },
      friday: { start: "07:00", end: "20:00" },
      saturday: { start: "07:00", end: "20:00" },
    },
  },
]);
