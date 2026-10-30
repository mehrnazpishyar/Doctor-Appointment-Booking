import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    message: "Backend is running!",
  });
});

app.get("/api/health/db", async (_req, res) => {
  try {
    await prisma.user.count();

    res.status(200).json({
      message: "Database connection is working!",
    });
  } catch (error) {
    console.error(
      "Database health check failed:",
      error.code || error.name
    );

    res.status(503).json({
      message: "Database is unavailable",
    });
  }
});

export default app;