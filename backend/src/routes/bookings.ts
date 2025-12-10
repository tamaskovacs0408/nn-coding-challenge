import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getBookingsByEmail,
} from "../services/bookingService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { email, barberId, date, time } = req.body;

  const newBooking = await createBooking({ email, barberId, date, time });

  res.status(201).json(newBooking);
});

router.get("/", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email query parameter is reqired" });
  }

  const bookings = await getBookingsByEmail(email as string);

  return res.status(200).json(bookings);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }

  await deleteBooking(id);

  return res.status(204).send();
})

export default router;