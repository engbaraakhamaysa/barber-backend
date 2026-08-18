import { Request, Response, NextFunction } from "express";

// Check email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Validate register data
export function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password } = req.body;

  // Validate name
  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  // Validate email
  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  // Validate password
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  // Normalize user input
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
}

// Validate login data
export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  // Validate email
  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  // Validate password
  if (typeof password !== "string" || password.length === 0) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  // Normalize email
  req.body.email = email.trim().toLowerCase();

  next();
}
