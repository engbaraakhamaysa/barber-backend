import { Request, Response, NextFunction } from "express";

///////////////////////////////////////////
// VALIDATE CREATE BARBER
// Check required fields before creating barber
///////////////////////////////////////////
export function validateCreateBarber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { shop_id, name, email, password } = req.body;

  ///////////////////////////////////////////
  // Validate shop id
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // Validate barber name
  ///////////////////////////////////////////
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Barber name must be at least 2 characters",
    });
  }

  ///////////////////////////////////////////
  // Validate email
  ///////////////////////////////////////////
  if (!email || typeof email !== "string") {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  ///////////////////////////////////////////
  // Validate password
  ///////////////////////////////////////////
  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  next();
}

///////////////////////////////////////////
// VALIDATE UPDATE BARBER
// Check optional fields before updating barber
///////////////////////////////////////////
export function validateUpdateBarber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password, is_active } = req.body;

  ///////////////////////////////////////////
  // Validate barber name if provided
  ///////////////////////////////////////////
  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Barber name must be at least 2 characters",
    });
  }

  ///////////////////////////////////////////
  // Validate email if provided
  ///////////////////////////////////////////
  if (email !== undefined && typeof email !== "string") {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  ///////////////////////////////////////////
  // Validate password if provided
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
  // Validate account status if provided
  ///////////////////////////////////////////
  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({
      message: "is_active must be a boolean",
    });
  }

  next();
}
