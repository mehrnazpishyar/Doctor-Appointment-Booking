import { prisma } from "../lib/prisma.js";
import {
  BOOKING_TIME_ZONE,
  SLOT_MINUTES,
  getBookingDay,
  createDaySlots,
} from "../utils/bookingSlots.js";

const doctorSelect = {
  id: true,
  name: true,
  image: true,
  specialty: true,
  degree: true,
  experience: true,
  about: true,
  fees: true,
  addressLine1: true,
  addressLine2: true,
  available: true,
};

function serializeDoctor(doctor) {
  return {
    ...doctor,
    fees: Number(doctor.fees),
  };
}

export async function listDoctors({ specialty, page, limit }) {
  const where = specialty
    ? {
        specialty: {
          equals: specialty,
          mode: "insensitive",
        },
      }
    : {};

  const [doctors, total] = await Promise.all([
    prisma.doctor.findMany({
      where,
      select: doctorSelect,
      orderBy: [
        { name: "asc" },
        { id: "asc" },
      ],
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.doctor.count({ where }),
  ]);

  return {
    doctors: doctors.map(serializeDoctor),

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function findDoctorById(id) {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    select: doctorSelect,
  });

  return doctor ? serializeDoctor(doctor) : null;
}

export async function getDoctorSlots(doctorId, date) {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: {
      id: true,
      available: true,
    },
  });

  if (!doctor) {
    return null;
  }

  const result = {
    doctorId: doctor.id,
    date,
    timeZone: BOOKING_TIME_ZONE,
    slotDurationMinutes: SLOT_MINUTES,
    doctorAvailable: doctor.available,
    slots: [],
  };

  if (!doctor.available) {
    return result;
  }

  const day = getBookingDay(date);

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      status: "BOOKED",
      startsAt: {
        gte: day.toJSDate(),
        lt: day.plus({ days: 1 }).toJSDate(),
      },
    },

    select: {
      startsAt: true,
    },
  });

  const bookedTimes = new Set(
    appointments.map((appointment) =>
      appointment.startsAt.getTime()
    )
  );

  result.slots = createDaySlots(date).filter(
    (slot) => !bookedTimes.has(Date.parse(slot.startsAt))
  );

  return result;
}