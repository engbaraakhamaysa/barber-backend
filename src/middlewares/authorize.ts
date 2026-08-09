import { Request, Response, NextFunction } from "express";

import { UserRole } from "../modules/users/user.types";

///////////////////////////////////////////
// AUTHORIZATION MIDDLEWARE
// Restrict access based on allowed user roles
// Requires authenticated user from auth middleware
///////////////////////////////////////////
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    ///////////////////////////////////////////
    // Check authentication
    // User must be attached to the request
    ///////////////////////////////////////////
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    ///////////////////////////////////////////
    // Check user role
    // Allow access only for authorized roles
    ///////////////////////////////////////////
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};
