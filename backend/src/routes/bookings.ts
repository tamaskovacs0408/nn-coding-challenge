import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getBookingsByEmail,
} from "../services/bookingService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, barberId, date, time } = req.body;

    const newBooking = await createBooking({ email, barberId, date, time });

    res.status(201).json(newBooking);
  } catch (error: any) {
    if (error.message === "Invalid email") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Invalid barberId") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Invalid datetime") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Cannot book for past date") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Barber not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "Barber does not work on this day") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Time outside of barber's working hours") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Time slot already booked") {
      return res.status(409).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email query parameter is reqired" });
    }

    const bookings = await getBookingsByEmail(email as string);

    return res.status(200).json(bookings);

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({ message: "Internal server error" });

  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id parameter is required" });
    }

    await deleteBooking(id);

    return res.status(204).send();

  } catch (error: any) {
    
    if (error.message === "Id required") {
      return res.status(400).json({ message: error.message});
    }

    if (error.message === "Booking not found") {
      return res.status(404).json({ message: error.message });
    }

    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
})

export default router;