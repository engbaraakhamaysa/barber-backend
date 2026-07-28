import { Request, Response, NextFunction } from "express";

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

export function validateUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password, is_active } = req.body;

  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  if (email !== undefined && typeof email !== "string") {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  if (
    password !== undefined &&
    (typeof password !== "string" || password.length < 6)
  ) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({
      message: "is_active must be a boolean",
    });
  }

  next();
}
