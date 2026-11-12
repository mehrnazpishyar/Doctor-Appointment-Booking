import { DateTime } from "luxon";
import { prisma } from "../lib/prisma.js";
import { getDoctorSlots } from "./doctor.service.js";

import {
  BOOKING_TIME_ZONE,
  isBookableDate,
} from "../utils/bookingSlots.js";

function appointmentError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function createAppointment(
  userId,
  { doctorId, startsAt }
) {
  const requestedTime = DateTime.fromISO(startsAt, {
    setZone: true,
  });

  if (!requestedTime.isValid) {
    throw appointmentError(400, "Invalid appointment time");
  }

  const date = requestedTime
    .setZone(BOOKING_TIME_ZONE)
    .toISODate();

  if (!isBookableDate(date)) {
    throw appointmentError(
      400,
      "Choose a date within the booking window"
    );
  }

  const availability = await getDoctorSlots(doctorId, date);

  if (!availability) {
    throw appointmentError(404, "Doctor not found");
  }

  if (!availability.doctorAvailable) {
    throw appointmentError(
      409,
      "Doctor is currently unavailable"
    );
  }

  const selectedSlot = availability.slots.find(
    (slot) =>
      Date.parse(slot.startsAt) === requestedTime.toMillis()
  );

  if (!selectedSlot) {
    throw appointmentError(
      409,
      "Selected time slot is unavailable"
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw appointmentError(
      401,
      "User account is unavailable"
    );
  }

  if (Date.parse(selectedSlot.startsAt) <= Date.now()) {
    throw appointmentError(
      409,
      "Selected time slot has already passed"
    );
  }

  return prisma.appointment.create({
    data: {
      userId,
      doctorId,
      startsAt: new Date(selectedSlot.startsAt),
      status: "BOOKED",
    },

    select: {
      id: true,
      doctorId: true,
      startsAt: true,
      status: true,
      createdAt: true,
      doctor: {
        select: {
          name: true,
          image: true,
          specialty: true,
        },
      },
    },
  });
}