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

  ///////////////////////////////////////////
  // VALIDATE NAME
  // Name must be string and at least 2 characters
  ///////////////////////////////////////////
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  ///////////////////////////////////////////
  // VALIDATE EMAIL
  // Email is required and must be string
  ///////////////////////////////////////////
  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  ///////////////////////////////////////////
  // VALIDATE PASSWORD
  // Password is required and minimum 6 characters
  ///////////////////////////////////////////
  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  ///////////////////////////////////////////
  // VALIDATE ROLE
  // Allow only supported user roles
  ///////////////////////////////////////////
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
  const { name, email, password, is_active } = req.body;

  ///////////////////////////////////////////
  // VALIDATE NAME IF PROVIDED
  // Allow partial update
  ///////////////////////////////////////////
  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  ///////////////////////////////////////////
  // VALIDATE EMAIL IF PROVIDED
  ///////////////////////////////////////////
  if (email !== undefined && typeof email !== "string") {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  ///////////////////////////////////////////
  // VALIDATE PASSWORD IF PROVIDED
  // Password update requires minimum length
  ///////////////////////////////////////////
  if (
    password !== undefined &&
    (typeof password !== "string" || password.length < 6)
  ) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  ///////////////////////////////////////////
  // VALIDATE ACCOUNT STATUS
  // is_active must be boolean value
  ///////////////////////////////////////////
  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({
      message: "is_active must be a boolean",
    });
  }

  next();
}
