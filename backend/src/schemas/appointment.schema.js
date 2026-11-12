import { z } from "zod";

export const createAppointmentSchema = z
  .object({
    doctorId: z.string().trim().min(1).max(100),

    startsAt: z.iso.datetime({
      offset: true,
    }),
  })
  .strict();

  export const myAppointmentsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  })
  .strict();

export const appointmentParamsSchema = z.object({
  id: z.string().trim().min(1).max(100),
});