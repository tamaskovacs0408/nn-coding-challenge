import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getBookingsByEmail,
} from "../services/bookingService.js";

const router = Router();

/**
 * @openapi
 * /api/booking:
 *   post:
 *     summary: Create a new booking
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - barberId
 *               - date
 *               - time
 *             properties:
 *               email:
 *                 type: string
 *               barberId:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Invalid input or past date
 *       409:
 *         description: Time slot already booked
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  const { email, barberId, date, time } = req.body;

  const newBooking = await createBooking({ email, barberId, date, time });

  res.status(201).json(newBooking);
});

/**
 * @openapi
 * /api/booking:
 *   get:
 *     summary: Get bookings for a user by email
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings
 *       400:
 *         description: Missing email
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email query parameter is reqired" });
  }

  const bookings = await getBookingsByEmail(email as string);

  return res.status(200).json(bookings);
});

/**
 * @openapi
 * /api/booking/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }

  await deleteBooking(id);

  return res.status(204).send();
})

export default router;