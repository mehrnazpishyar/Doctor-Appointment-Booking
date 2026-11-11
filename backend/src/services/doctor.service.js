import { prisma } from "../lib/prisma.js";

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