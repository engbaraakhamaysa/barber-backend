import { Request, Response, NextFunction } from "express";

export function validateCreateShop(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, location } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Shop name must be at least 2 characters",
    });
  }

  if (!location || typeof location !== "string" || location.trim().length < 2) {
    return res.status(400).json({
      message: "Shop location must be at least 2 characters",
    });
  }

  next();
}

export function validateUpdateShop(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, location, is_active } = req.body;

  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Shop name must be at least 2 characters",
    });
  }

  if (
    location !== undefined &&
    (typeof location !== "string" || location.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Shop location must be at least 2 characters",
    });
  }

  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({
      message: "is_active must be a boolean",
    });
  }

  next();
}
