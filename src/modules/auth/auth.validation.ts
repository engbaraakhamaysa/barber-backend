import { Request, Response, NextFunction } from "express";

// Check email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Check user role
function isValidUserRole(role: unknown): boolean {
  return role === "admin" || role === "barber" || role === "user";
}

// Validate create user data
export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password, role } = req.body;

  // Validate name
  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  // Validate email
  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  // Validate password
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  // Validate role
  if (!isValidUserRole(role)) {
    return res.status(400).json({
      message: "Valid role is required",
    });
  }

  // Normalize user input
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
}

// Validate update user data
export function validateUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password, role, is_active } = req.body;

  // Validate name if provided
  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  // Validate email if provided
  if (
    email !== undefined &&
    (typeof email !== "string" || !isValidEmail(email))
  ) {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  // Validate password if provided
  if (
    password !== undefined &&
    (typeof password !== "string" || password.length < 8)
  ) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  // Validate role if provided
  if (role !== undefined && !isValidUserRole(role)) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }

  // Validate account status if provided
  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({
      message: "is_active must be a boolean",
    });
  }

  // Normalize user input
  if (name !== undefined) {
    req.body.name = name.trim();
  }

  if (email !== undefined) {
    req.body.email = email.trim().toLowerCase();
  }

  next();
}
