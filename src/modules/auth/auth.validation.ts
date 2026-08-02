import { Request, Response, NextFunction } from "express";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password } = req.body;

  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      message: "Name must be at least 2 characters",
    });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({
      message: "Valid email is required",
    });
  }

  if (typeof password !== "string" || password.length === 0) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  req.body.email = email.trim().toLowerCase();

  next();
}
