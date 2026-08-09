import { Request, Response, NextFunction } from "express";
import { BookingStatus } from "./booking.types";

// List of valid booking statuses
// Used to validate the booking status before updating
const validBookingStatuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "no_show",
];

///////////////////////////////////////////
// CREATE BOOKING VALIDATION
// Validate customer_id and slot_id
// Both values must be positive integers
// Continue to the controller when validation succeeds
///////////////////////////////////////////
export function validateCreateBooking(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { customer_id, slot_id } = req.body;

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
    slot_id === undefined ||
    typeof slot_id !== "number" ||
    !Number.isInteger(slot_id) ||
    slot_id <= 0
  ) {
    return res.status(400).json({
      message: "Valid slot_id is required",
    });
  }

  next();
}

///////////////////////////////////////////
// UPDATE BOOKING VALIDATION
// Validate the booking status when provided
// Status must match one of the supported booking statuses
// Continue to the controller when validation succeeds
///////////////////////////////////////////
export function validateUpdateBooking(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { status } = req.body;

  if (status !== undefined && !validBookingStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid booking status",
    });
  }

  next();
}
