import { Request, Response, NextFunction } from "express";
import { BookingStatus } from "./booking.types";

const validBookingStatuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "no_show",
];

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
