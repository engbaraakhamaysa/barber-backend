import { Request, Response, NextFunction } from "express";

///////////////////////////////////////////
// VALIDATE CREATE SHOP
// Check required fields before creating shop
///////////////////////////////////////////
export function validateCreateShop(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, location } = req.body;

  ///////////////////////////////////////////
  // Validate shop name
  ///////////////////////////////////////////
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Shop name must be at least 2 characters",
    });
  }

  ///////////////////////////////////////////
  // Validate shop location
  ///////////////////////////////////////////
  if (!location || typeof location !== "string" || location.trim().length < 2) {
    return res.status(400).json({
      message: "Shop location must be at least 2 characters",
    });
  }

  next();
}

///////////////////////////////////////////
// VALIDATE UPDATE SHOP
// Check optional fields before updating shop
///////////////////////////////////////////
export function validateUpdateShop(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, location, is_active } = req.body;

  ///////////////////////////////////////////
  // Validate shop name if provided
  ///////////////////////////////////////////
  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Shop name must be at least 2 characters",
    });
  }

  ///////////////////////////////////////////
  // Validate shop location if provided
  ///////////////////////////////////////////
  if (
    location !== undefined &&
    (typeof location !== "string" || location.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Shop location must be at least 2 characters",
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
