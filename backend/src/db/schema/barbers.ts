import { pgTable, uuid, text, jsonb } from "drizzle-orm/pg-core";

export const barbers = pgTable("barbers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  workSchedule: jsonb("work_schedule").notNull(),
});
