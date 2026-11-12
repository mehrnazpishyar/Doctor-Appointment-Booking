import { Router } from "express";

import {
  requireAuth,
} from "../middleware/auth.middleware.js";

import {
  bookAppointment,
} from "../controllers/appointment.controller.js";

const router = Router();

router.post("/", requireAuth, bookAppointment);

export default router;