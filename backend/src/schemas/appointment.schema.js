import { z } from "zod";

export const createAppointmentSchema = z
  .object({
    doctorId: z.string().trim().min(1).max(100),

    startsAt: z.iso.datetime({
      offset: true,
    }),
  })
  .strict();