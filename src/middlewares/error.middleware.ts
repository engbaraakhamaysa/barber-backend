import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

///////////////////////////////////////////
// GLOBAL ERROR MIDDLEWARE
// Handle application errors in one place
// Return appropriate HTTP status and message
///////////////////////////////////////////
export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  ///////////////////////////////////////////
  // Handle known application errors
  // Return custom status code and message
  ///////////////////////////////////////////
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  ///////////////////////////////////////////
  // Handle unexpected server errors
  // Avoid exposing internal error details
  ///////////////////////////////////////////
  return res.status(500).json({
    message: "Internal server error",
  });
};
