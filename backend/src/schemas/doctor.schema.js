import { z } from "zod";

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