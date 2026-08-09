import { Request, Response, NextFunction } from "express";
import { QueueStatus } from "./queue.types";

///////////////////////////////////////////
// VALID QUEUE STATUSES
// Define all allowed queue status values
// Used to prevent invalid status updates
///////////////////////////////////////////
const validQueueStatuses: QueueStatus[] = [
  "waiting",
  "called",
  "in_service",
  "completed",
  "cancelled",
];

///////////////////////////////////////////
// JOIN QUEUE VALIDATION
// Validate customer and barber IDs
// Ensure both values are positive integers
///////////////////////////////////////////
export function validateJoinQueue(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { customer_id, barber_id } = req.body;

  ///////////////////////////////////////////
  // Validate customer ID
  // Customer ID must be a positive integer
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // Validate barber ID
  // Barber ID must be a positive integer
  ///////////////////////////////////////////
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

  next();
}

///////////////////////////////////////////
// UPDATE QUEUE VALIDATION
// Validate optional queue update fields
// Ensure status and barber ID contain valid values
///////////////////////////////////////////
export function validateUpdateQueue(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { status, barber_id } = req.body;

  ///////////////////////////////////////////
  // Validate queue status
  // Status must be one of the allowed values
  ///////////////////////////////////////////
  if (status !== undefined && !validQueueStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid queue status",
    });
  }

  ///////////////////////////////////////////
  // Validate barber ID
  // Barber ID must be a positive integer
  ///////////////////////////////////////////
  if (
    barber_id !== undefined &&
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
