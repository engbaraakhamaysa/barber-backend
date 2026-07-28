import { Request, Response, NextFunction } from "express";
import { QueueStatus } from "./queue.types";

const validQueueStatuses: QueueStatus[] = [
  "waiting",
  "in_service",
  "completed",
  "cancelled",
];

export function validateJoinQueue(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { customer_id, shop_id, barber_id, booking_id } = req.body;

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
    barber_id !== undefined &&
    barber_id !== null &&
    (typeof barber_id !== "number" ||
      !Number.isInteger(barber_id) ||
      barber_id <= 0)
  ) {
    return res.status(400).json({
      message: "Invalid barber_id",
    });
  }

  if (
    booking_id !== undefined &&
    booking_id !== null &&
    (typeof booking_id !== "number" ||
      !Number.isInteger(booking_id) ||
      booking_id <= 0)
  ) {
    return res.status(400).json({
      message: "Invalid booking_id",
    });
  }

  next();
}

export function validateUpdateQueue(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { status, barber_id } = req.body;

  if (status !== undefined && !validQueueStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid queue status",
    });
  }

  if (
    barber_id !== undefined &&
    barber_id !== null &&
    (typeof barber_id !== "number" ||
      !Number.isInteger(barber_id) ||
      barber_id <= 0)
  ) {
    return res.status(400).json({
      message: "Invalid barber_id",
    });
  }

  next();
}
