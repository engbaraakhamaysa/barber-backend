import { Request, Response, NextFunction } from "express";

export function validateCreateBarber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { shop_id, name, email, password } = req.body;

  if (
    shop_id === undefined ||
    typeof shop_id !== "number" ||
    !Number.isInteger(shop_id) ||
    shop_id <= 0
  ) {
    return res.status(400).json({
      message: "Valid shop_id is required",
    });
  }

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Barber name must be at least 2 characters",
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

  next();
}

export function validateUpdateBarber(
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
      message: "Barber name must be at least 2 characters",
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
