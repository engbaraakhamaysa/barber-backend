import { Request, Response, NextFunction } from "express";

export function validateCreateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, phone } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Customer name must be at least 2 characters",
    });
  }

  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return res.status(400).json({
      message: "Phone must be a string",
    });
  }

  next();
}

export function validateUpdateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, phone } = req.body;

  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Customer name must be at least 2 characters",
    });
  }

  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return res.status(400).json({
      message: "Phone must be a string",
    });
  }

  next();
}
