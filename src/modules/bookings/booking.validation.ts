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
  const { customer_id, shop_id, barber_id, booking_slot_id } = req.body;

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
    shop_id === undefined ||
    typeof shop_id !== "number" ||
    !Number.isInteger(shop_id) ||
    shop_id <= 0
  ) {
    return res.status(400).json({
      message: "Valid shop_id is required",
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
    booking_slot_id === undefined ||
    typeof booking_slot_id !== "number" ||
    !Number.isInteger(booking_slot_id) ||
    booking_slot_id <= 0
  ) {
    return res.status(400).json({
      message: "Valid booking_slot_id is required",
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
