import { Request, Response, NextFunction } from "express";

// CREATE BARBER
export function validateCreateBarber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { shop_id, name, email, password } = req.body;

  if (shop_id === undefined || typeof shop_id !== "number") {
    return res.status(400).json({
      message: "Valid shop_id is required",
    });
  }

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Barber name is required",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Barber email is required",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      message: "Barber password is required",
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      message: "Barber name must be at least 2 characters",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  next();
}

// UPDATE BARBER
export function validateUpdateBarber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id, name, email, password, is_active } = req.body;

  if (id === undefined || typeof id !== "number") {
    return res.status(400).json({
      message: "Valid barber id is required",
    });
  }

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Barber name is required",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Barber email is required",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      message: "Barber password is required",
    });
  }

  if (typeof is_active !== "boolean") {
    return res.status(400).json({
      message: "is_active must be a boolean",
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      message: "Barber name must be at least 2 characters",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  next();
}

// LOGIN BARBER
export function validateLoginBarber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  next();
}
