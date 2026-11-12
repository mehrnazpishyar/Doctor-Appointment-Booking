import { z } from "zod";
import { isBookableDate } from "../utils/bookingSlots.js";

export const doctorsQuerySchema = z
  .object({
    specialty: z.string().trim().min(1).max(100).optional(),

    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(50),
  })
  .strict();

export const doctorParamsSchema = z.object({
  id: z.string().trim().min(1).max(100),
});

export const doctorSlotsQuerySchema = z
  .object({
    date: z.iso.date().refine(
      isBookableDate,
      "Choose today or one of the next 6 days"
    ),
  })
  .strict();