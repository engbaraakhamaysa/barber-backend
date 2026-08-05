import { Request, Response, NextFunction } from "express";

///////////////////////////////////////////
// VALIDATE CREATE USER
// Check required fields before creating user
///////////////////////////////////////////
export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password, role } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  if (!role || !["admin", "barber", "user"].includes(role)) {
    return res.status(400).json({
      message: "Valid role is required",
    });
  }

  next();
}

///////////////////////////////////////////
// VALIDATE UPDATE USER
// Check optional fields before updating user
///////////////////////////////////////////
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
  if (email !== undefined && typeof email !== "string") {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  // Validate password if provided
  if (
    password !== undefined &&
    (typeof password !== "string" || password.length < 6)
  ) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  // Validate role if provided
  if (role !== undefined && !["admin", "barber", "user"].includes(role)) {
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

  next();
}
