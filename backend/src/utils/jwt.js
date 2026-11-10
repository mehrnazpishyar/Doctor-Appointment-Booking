import "dotenv/config";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
  throw new Error("JWT_SECRET must contain at least 32 bytes");
}

export function createAccessToken(userId) {
  return jwt.sign({}, secret, {
    algorithm: "HS256",
    subject: userId,
    expiresIn: "1h",
    issuer: "doctor-appointment-booking-api",
    audience: "doctor-appointment-booking-web",
  });
}

export function verifyAccessToken(token) {
  const payload = jwt.verify(token, secret, {
    algorithms: ["HS256"],
    issuer: "doctor-appointment-booking-api",
    audience: "doctor-appointment-booking-web",
  });

  if (
    typeof payload === "string" ||
    typeof payload.sub !== "string" ||
    payload.sub.length === 0 ||
    typeof payload.exp !== "number"
  ) {
    throw new jwt.JsonWebTokenError("Invalid token payload");
  }

  return payload.sub;
}