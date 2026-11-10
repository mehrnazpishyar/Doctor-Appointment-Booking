import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters")
      .max(100, "Name is too long"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254, "Email is too long")
      .email("Invalid email address"),

    password: z
      .string()
      .min(12, "Password must contain at least 12 characters")
      .max(72, "Password is too long")
      .refine(
        (value) => Buffer.byteLength(value, "utf8") <= 72,
        "Password must not exceed 72 bytes"
      ),
  })
  .strict();