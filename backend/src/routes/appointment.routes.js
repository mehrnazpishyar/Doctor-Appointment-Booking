import { Router } from "express";

import {
    requireAuth,
} from "../middleware/auth.middleware.js";

import {
    bookAppointment,
    getMyAppointments,
    cancelAppointment
} from "../controllers/appointment.controller.js";

const router = Router();

router.post("/", requireAuth, bookAppointment);

router.get("/", requireAuth, getMyAppointments);

router.patch("/:id/cancel", requireAuth, cancelAppointment);

export default router;