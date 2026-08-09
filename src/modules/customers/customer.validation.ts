import { Request, Response, NextFunction } from "express";

///////////////////////////////////////////
// CREATE CUSTOMER VALIDATION
// Validate required customer data before creation
// Ensure the name and optional phone have valid types
///////////////////////////////////////////
export function validateCreateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, phone } = req.body;

  ///////////////////////////////////////////
  // Validate customer name
  // Name must be a string with at least 2 characters
  ///////////////////////////////////////////
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Customer name must be at least 2 characters",
    });
  }

  ///////////////////////////////////////////
  // Validate phone number
  // Phone is optional and may be null
  // When provided, it must be a string
  ///////////////////////////////////////////
  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return res.status(400).json({
      message: "Phone must be a string",
    });
  }

  next();
}

///////////////////////////////////////////
// UPDATE CUSTOMER VALIDATION
// Validate optional customer fields before update
// Only provided fields are validated
///////////////////////////////////////////
export function validateUpdateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, phone } = req.body;

  ///////////////////////////////////////////
  // Validate customer name
  // Validate only when the field is provided
  ///////////////////////////////////////////
  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length < 2)
  ) {
    return res.status(400).json({
      message: "Customer name must be at least 2 characters",
    });
  }

  ///////////////////////////////////////////
  // Validate phone number
  // Phone is optional and may be null
  // When provided, it must be a string
  ///////////////////////////////////////////
  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return res.status(400).json({
      message: "Phone must be a string",
    });
  }

  next();
}
