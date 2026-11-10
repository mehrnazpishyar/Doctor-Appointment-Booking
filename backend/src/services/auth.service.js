import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { createAccessToken } from "../utils/jwt.js";

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

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return null;
  }

  return {
    token: createAccessToken(user.id),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function getUserById(userId) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      addressLine1: true,
      addressLine2: true,
      gender: true,
      dob: true,
      profilePicture: true,
      createdAt: true,
    },
  });
}