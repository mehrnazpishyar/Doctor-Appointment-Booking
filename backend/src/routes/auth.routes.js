import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { register } from "../controllers/auth.controller.js";

const router = Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many attempts. Please try again later.",
  },
});

router.post("/register", registerLimiter, register);

export default router;