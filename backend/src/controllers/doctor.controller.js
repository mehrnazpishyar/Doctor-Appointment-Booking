import {
  doctorsQuerySchema,
  doctorParamsSchema,
   doctorSlotsQuerySchema,
} from "../schemas/doctor.schema.js";

import {
  listDoctors,
  findDoctorById,
  getDoctorSlots,
} from "../services/doctor.service.js";

export async function getDoctors(req, res) {
  const result = doctorsQuerySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid query parameters",
    });
  }

  try {
    const data = await listDoctors(result.data);

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "Could not load doctors:",
      error.code || error.name
    );

    return res.status(500).json({
      message: "Could not load doctors",
    });
  }
}

export async function getDoctor(req, res) {
  const result = doctorParamsSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid doctor ID",
    });
  }

  try {
    const doctor = await findDoctorById(result.data.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      doctor,
    });
  } catch (error) {
    console.error(
      "Could not load doctor:",
      error.code || error.name
    );

    return res.status(500).json({
      message: "Could not load doctor",
    });
  }
}

export async function getSlots(req, res) {
  const params = doctorParamsSchema.safeParse(req.params);
  const query = doctorSlotsQuerySchema.safeParse(req.query);

  if (!params.success || !query.success) {
    return res.status(400).json({
      message:
        "Provide a valid doctor ID and a date within the booking window",
    });
  }

  try {
    const data = await getDoctorSlots(
      params.data.id,
      query.data.date
    );

    if (!data) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "Could not load booking slots:",
      error.code || error.name
    );

    return res.status(500).json({
      message: "Could not load booking slots",
    });
  }
}