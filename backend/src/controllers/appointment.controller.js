import {
  createAppointmentSchema,
} from "../schemas/appointment.schema.js";

import {
  createAppointment,
} from "../services/appointment.service.js";

export async function bookAppointment(req, res) {
  const result = createAppointmentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    const appointment = await createAppointment(
      req.userId,
      result.data
    );

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Selected time slot is already booked",
      });
    }

    if ([400, 401, 404, 409].includes(error.status)) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    console.error(
      "Booking failed:",
      error.code || error.name
    );

    return res.status(500).json({
      message: "Could not book appointment",
    });
  }
}