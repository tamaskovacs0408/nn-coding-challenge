import { Router } from "express";
import fetchBarbers from "../services/barberService.js";

const router = Router();

/**
 * @openapi
 * /api/barbers:
 *   get:
 *     summary: Get list of barbers
 *     tags:
 *       - Barbers
 *     responses:
 *       200:
 *         description: List of barbers
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  const barbers = await fetchBarbers();
  res.status(200).json(barbers);

})

export default router;