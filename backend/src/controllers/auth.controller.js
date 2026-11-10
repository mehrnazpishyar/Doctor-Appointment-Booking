import { registerSchema } from "../schemas/auth.schema.js";
import { registerUser } from "../services/auth.service.js";

export async function register(req, res) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    const user = await registerUser(result.data);

    return res.status(201).json({
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    console.error(
      "Registration failed:",
      error.code || error.name
    );

    return res.status(500).json({
      message: "Could not create account",
    });
  }
}