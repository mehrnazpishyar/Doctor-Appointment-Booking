import { prisma } from "../src/lib/prisma.js";
import { doctors } from "./data/doctors.js";

async function main() {
  for (const doctor of doctors) {
    await prisma.doctor.upsert({
      where: {
        id: doctor._id,
      },

      update: {},

      create: {
        id: doctor._id,
        name: doctor.name,
        image: doctor.image,
        specialty: doctor.specialty,
        degree: doctor.degree.trim(),
        experience: doctor.experience,
        about: doctor.about,
        fees: String(doctor.fees),
        addressLine1: doctor.address.line1,
        addressLine2: doctor.address.line2,
        available: true,
      },
    });
  }

  const count = await prisma.doctor.count({
    where: {
      id: {
        in: doctors.map((doctor) => doctor._id),
      },
    },
  });

  console.log(`Seed completed: ${count} demo doctors in database.`);
}

main()
  .catch((error) => {
    console.error(
      "Doctor seed failed:",
      error.code || error.name
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });