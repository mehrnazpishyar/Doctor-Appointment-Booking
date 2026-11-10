import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

export async function registerUser({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
}