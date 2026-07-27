import { Request, Response, NextFunction } from "express";

// CREATE BOOKING SLOTS
export function validateCreateBookingSlots(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { barber_id, slots } = req.body;

  if (barber_id === undefined || typeof barber_id !== "number") {
    return res.status(400).json({
      message: "Valid barber_id is required",
    });
  }

  if (!Array.isArray(slots) || slots.length === 0) {
    return res.status(400).json({
      message: "At least one slot is required",
    });
  }

  const isValidSlots = slots.every(
    (slot) => typeof slot === "string" && /^\d{2}:\d{2}$/.test(slot),
  );

  if (!isValidSlots) {
    return res.status(400).json({
      message: "Each slot must have a valid time format HH:mm",
    });
  }

  next();
}

// BOOK SLOT
export function validateBookSlot(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { slot_id, customer_name, customer_phone } = req.body;

  if (slot_id === undefined || typeof slot_id !== "number") {
    return res.status(400).json({
      message: "Valid slot_id is required",
    });
  }

  if (!customer_name || typeof customer_name !== "string") {
    return res.status(400).json({
      message: "Customer name is required",
    });
  }

  if (customer_name.trim().length < 2) {
    return res.status(400).json({
      message: "Customer name must be at least 2 characters",
    });
  }

  if (customer_phone !== undefined && typeof customer_phone !== "string") {
    return res.status(400).json({
      message: "Customer phone must be a string",
    });
  }

  next();
}
