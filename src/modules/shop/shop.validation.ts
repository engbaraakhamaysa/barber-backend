import { Request, Response, NextFunction } from "express";

export function validateCreateShop(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, location } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Shop name is required",
    });
  }

  if (!location || typeof location !== "string") {
    return res.status(400).json({
      message: "Shop location is required",
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      message: "Shop name must be at least 2 characters",
    });
  }

  if (location.trim().length < 2) {
    return res.status(400).json({
      message: "Shop location must be at least 2 characters",
    });
  }

  next();
}
