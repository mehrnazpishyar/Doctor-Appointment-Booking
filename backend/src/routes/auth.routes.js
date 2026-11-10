import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { register, login, } from "../controllers/auth.controller.js";

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


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});

router.post("/login", loginLimiter, login);

export default router;

