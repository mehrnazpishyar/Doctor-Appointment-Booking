import { Router } from "express";

import {
  getDoctors,
  getDoctor,
  getSlots,
} from "../controllers/doctor.controller.js";

const router = Router();

router.get("/", getDoctors);

router.get("/:id/slots", getSlots);

router.get("/:id", getDoctor);

export default router;