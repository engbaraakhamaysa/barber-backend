import { Request, Response, NextFunction } from "express";

///////////////////////////////////////////
// CREATE BOOKING SLOT VALIDATION
// Validate barber and slot time
// Ensure required fields are provided
// Validate slot time format
///////////////////////////////////////////
export function validateCreateBookingSlot(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { barber_id, slot_time } = req.body;

  ///////////////////////////////////////////
  // Validate barber ID
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

  ///////////////////////////////////////////
  // Validate slot time
  ///////////////////////////////////////////
  if (!slot_time) {
    return res.status(400).json({
      message: "slot_time is required",
    });
  }

  ///////////////////////////////////////////
  // Validate slot time format
  ///////////////////////////////////////////
  const slotDate = new Date(slot_time);

  if (isNaN(slotDate.getTime())) {
    return res.status(400).json({
      message: "Invalid slot_time",
    });
  }

  next();
}

///////////////////////////////////////////
// UPDATE BOOKING SLOT VALIDATION
// Validate optional slot time
// Validate date format when provided
///////////////////////////////////////////
export function validateUpdateBookingSlot(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { slot_time } = req.body;

  ///////////////////////////////////////////
  // Validate slot time
  ///////////////////////////////////////////
  if (slot_time !== undefined && isNaN(new Date(slot_time).getTime())) {
    return res.status(400).json({
      message: "Invalid slot_time",
    });
  }

  next();
}
