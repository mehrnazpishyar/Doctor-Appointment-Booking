import { verifyAccessToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  const authorization = req.get("Authorization");
  const match = authorization?.match(/^Bearer (\S+)$/i);

  if (!match) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  let userId;

  try {
    userId = verifyAccessToken(match[1]);
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  req.userId = userId;
  next();
}