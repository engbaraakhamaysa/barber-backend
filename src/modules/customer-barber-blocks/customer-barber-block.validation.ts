import { Request, Response, NextFunction } from "express";

///////////////////////////////////////////
// CREATE CUSTOMER-BARBER BLOCK VALIDATION
// Validate customer_id, barber_id, and optional reason
// Customer and barber IDs must be positive integers
// Reason must be a non-empty string with a maximum of 500 characters
///////////////////////////////////////////
export function validateCreateCustomerBarberBlock(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { customer_id, barber_id, reason } = req.body;

  if (
    customer_id === undefined ||
    typeof customer_id !== "number" ||
    !Number.isInteger(customer_id) ||
    customer_id <= 0
  ) {
    return res.status(400).json({
      message: "Valid customer_id is required",
    });
  }

  if (
    barber_id === undefined ||
    typeof barber_id !== "number" ||
    !Number.isInteger(barber_id) ||
    barber_id <= 0
  ) {
    return res.status(400).json({
      message: "Valid barber_id is required",
    });
  }

  if (
    reason !== undefined &&
    reason !== null &&
    (typeof reason !== "string" ||
      reason.trim().length === 0 ||
      reason.length > 500)
  ) {
    return res.status(400).json({
      message:
        "Reason must be a non-empty string with a maximum of 500 characters",
    });
  }

  next();
}
