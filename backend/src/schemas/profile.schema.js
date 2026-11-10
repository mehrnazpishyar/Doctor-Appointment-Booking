import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).max(100),

    phone: z.string().trim().max(30),

    addressLine1: z.string().trim().max(200),

    addressLine2: z.string().trim().max(200),

    gender: z.enum(["Male", "Female", "Other"]).nullable(),

    dob: z.iso
      .date()
      .refine(
        (value) => value <= new Date().toISOString().slice(0, 10),
        "Date of birth cannot be in the future"
      )
      .nullable(),
  })
  .partial()
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "Provide at least one field to update"
  );