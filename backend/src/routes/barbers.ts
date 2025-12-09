import { Router } from "express";
import fetchBarbers from "../services/barberService.js";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const barbers = await fetchBarbers();
    res.status(200).json(barbers);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch barbers",
      message: error instanceof Error ? error.message : "Unknown error" 
    });
  }
})

export default router;