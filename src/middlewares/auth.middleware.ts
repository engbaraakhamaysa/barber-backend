import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

///////////////////////////////////////////
// AUTHENTICATION MIDDLEWARE
// Verify authorization header and JWT token
// Attach authenticated user data to request
///////////////////////////////////////////
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  ///////////////////////////////////////////
  // Check authorization header
  ///////////////////////////////////////////
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header is required",
    });
  }

  ///////////////////////////////////////////
  // Validate Bearer token format
  ///////////////////////////////////////////
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid authorization format",
    });
  }

  try {
    ///////////////////////////////////////////
    // Verify JWT token
    // Reject invalid or expired tokens
    ///////////////////////////////////////////
    const payload = verifyToken(token);

    ///////////////////////////////////////////
    // Attach authenticated user to request
    ///////////////////////////////////////////
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
