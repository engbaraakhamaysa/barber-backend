import { Request, Response } from "express";

///////////////////////////////////////////
// NOT FOUND MIDDLEWARE
// Handle requests to undefined routes
// Return HTTP 404 with request method and URL
///////////////////////////////////////////
export const notFoundMiddleware = (req: Request, res: Response) => {
  return res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
