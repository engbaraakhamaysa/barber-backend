import { Request, Response, NextFunction } from "express";

///////////////////////////////////////////
// CREATE BOOKING SLOT VALIDATION
// Validate shop, barber, and time information
// Ensure required fields are provided
// Validate date format before creating the slot
// Ensure end time is after start time
///////////////////////////////////////////
export function validateCreateBookingSlot(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { shop_id, barber_id, start_time, end_time } = req.body;

  ///////////////////////////////////////////
  // Validate shop ID
  ///////////////////////////////////////////
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
  // Validate start time
  ///////////////////////////////////////////
  if (!start_time) {
    return res.status(400).json({
      message: "start_time is required",
    });
  }

  ///////////////////////////////////////////
  // Validate end time
  ///////////////////////////////////////////
  if (!end_time) {
    return res.status(400).json({
      message: "end_time is required",
    });
  }

  ///////////////////////////////////////////
  // Validate date format
  ///////////////////////////////////////////
  const startDate = new Date(start_time);
  const endDate = new Date(end_time);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({
      message: "Invalid date format",
    });
  }

  ///////////////////////////////////////////
  // Validate time range
  ///////////////////////////////////////////
  if (endDate <= startDate) {
    return res.status(400).json({
      message: "end_time must be after start_time",
    });
  }

  next();
}

///////////////////////////////////////////
// UPDATE BOOKING SLOT VALIDATION
// Validate optional time and availability fields
// Validate date format when provided
// Ensure end time is after start time
///////////////////////////////////////////
export function validateUpdateBookingSlot(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { start_time, end_time, is_available } = req.body;

  ///////////////////////////////////////////
  // Validate start time
  ///////////////////////////////////////////
  if (start_time !== undefined && isNaN(new Date(start_time).getTime())) {
    return res.status(400).json({
      message: "Invalid start_time",
    });
  }

  ///////////////////////////////////////////
  // Validate end time
  ///////////////////////////////////////////
  if (end_time !== undefined && isNaN(new Date(end_time).getTime())) {
    return res.status(400).json({
      message: "Invalid end_time",
    });
  }

  ///////////////////////////////////////////
  // Validate time range
  ///////////////////////////////////////////
  if (start_time !== undefined && end_time !== undefined) {
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);

    if (endDate <= startDate) {
      return res.status(400).json({
        message: "end_time must be after start_time",
      });
    }
  }

  ///////////////////////////////////////////
  // Validate availability
  ///////////////////////////////////////////
  if (is_available !== undefined && typeof is_available !== "boolean") {
    return res.status(400).json({
      message: "is_available must be a boolean",
    });
  }

  next();
}
