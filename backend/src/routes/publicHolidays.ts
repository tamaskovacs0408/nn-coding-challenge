import { Router } from "express";
import fetchPublicHolidays from "../services/publicHolidayService.js";

const router = Router();

router.get("/", async (req, res) => {
  const { year } = req.query;

  if (year) {
    const publicHolidays = await fetchPublicHolidays(year as string);

    return res.status(200).json(publicHolidays);
  }

  return res.status(400).json({ message: "Year required"});
})

export default router;