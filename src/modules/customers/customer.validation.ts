import { Request, Response, NextFunction } from "express";

export function validateCreateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { barber_id, name, phone } = req.body;

  if (barber_id === undefined || typeof barber_id !== "number") {
    return res.status(400).json({
      message: "Valid barber_id is required",
    });
  }

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Customer name is required",
    });
  }

  if (!phone || typeof phone !== "string") {
    return res.status(400).json({
      message: "Customer phone is required",
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      message: "Customer name must be at least 2 characters",
    });
  }

  if (phone.trim().length < 7) {
    return res.status(400).json({
      message: "Customer phone must be at least 7 characters",
    });
  }

  next();
}
