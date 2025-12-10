import { Router } from "express";
import fetchBarbers from "../services/barberService.js";

const router = Router();

router.get('/', async (req, res) => {
  const barbers = await fetchBarbers();
  res.status(200).json(barbers);

})

export default router;