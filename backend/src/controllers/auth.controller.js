import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { registerUser,  loginUser, getUserById,  updateUserProfile,} from "../services/auth.service.js";
import { updateProfileSchema } from "../schemas/profile.schema.js";

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

export async function login(req, res) {
  const result = loginSchema.safeParse(req.body);

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
    const data = await loginUser(result.data);

    if (!data) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    console.error(
      "Login failed:",
      error.code || error.name
    );

    return res.status(500).json({
      message: "Could not log in",
    });
  }
}

export async function me(req, res) {
  try {
    const user = await getUserById(req.userId);

    if (!user) {
      return res.status(401).json({
        message: "User account is unavailable",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(
      "Could not load user:",
      error.code || error.name
    );

    return res.status(500).json({
      message: "Could not load profile",
    });
  }
}

export async function updateProfile(req, res) {
  const result = updateProfileSchema.safeParse(req.body);

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
    const user = await updateUserProfile(
      req.userId,
      result.data
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(401).json({
        message: "User account is unavailable",
      });
    }

    console.error(
      "Profile update failed:",
      error.code || error.name
    );

    return res.status(500).json({
      message: "Could not update profile",
    });
  }
}