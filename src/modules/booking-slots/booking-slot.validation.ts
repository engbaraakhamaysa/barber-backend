import { Request, Response, NextFunction } from "express";

export function validateCreateBookingSlot(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { shop_id, barber_id, start_time, end_time } = req.body;

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

  if (!start_time) {
    return res.status(400).json({
      message: "start_time is required",
    });
  }

  if (!end_time) {
    return res.status(400).json({
      message: "end_time is required",
    });
  }

  const startDate = new Date(start_time);
  const endDate = new Date(end_time);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({
      message: "Invalid date format",
    });
  }

  if (endDate <= startDate) {
    return res.status(400).json({
      message: "end_time must be after start_time",
    });
  }

  next();
}

export function validateUpdateBookingSlot(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { start_time, end_time, is_available } = req.body;

  if (start_time !== undefined && isNaN(new Date(start_time).getTime())) {
    return res.status(400).json({
      message: "Invalid start_time",
    });
  }

  if (end_time !== undefined && isNaN(new Date(end_time).getTime())) {
    return res.status(400).json({
      message: "Invalid end_time",
    });
  }

  if (start_time !== undefined && end_time !== undefined) {
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);

    if (endDate <= startDate) {
      return res.status(400).json({
        message: "end_time must be after start_time",
      });
    }
  }

  if (is_available !== undefined && typeof is_available !== "boolean") {
    return res.status(400).json({
      message: "is_available must be a boolean",
    });
  }

  next();
}
