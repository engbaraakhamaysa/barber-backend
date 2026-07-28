import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  // REGISTER
  static async register(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      const user = await AuthService.register({
        name,
        email,
        password,
        role,
      });

      return res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      console.error("Controller error (register):", error);

      if (
        error instanceof Error &&
        error.message === "EMAIL_ALREADY_REGISTERED"
      ) {
        return res.status(409).json({
          message: "Email is already registered",
        });
      }

      return res.status(500).json({
        message: "Failed to register user",
      });
    }
  }

  // LOGIN
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await AuthService.login({
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error("Controller error (login):", error);

      if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      if (error instanceof Error && error.message === "USER_ACCOUNT_BLOCKED") {
        return res.status(403).json({
          message: "User account is blocked",
        });
      }

      if (
        error instanceof Error &&
        error.message === "JWT_SECRET_NOT_CONFIGURED"
      ) {
        return res.status(500).json({
          message: "Authentication configuration error",
        });
      }

      return res.status(500).json({
        message: "Failed to login",
      });
    }
  }

  // GET CURRENT USER
  static async me(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      const user = await AuthService.getCurrentUser(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Controller error (get current user):", error);

      if (error instanceof Error && error.message === "USER_ACCOUNT_BLOCKED") {
        return res.status(403).json({
          message: "User account is blocked",
        });
      }

      return res.status(500).json({
        message: "Failed to get current user",
      });
    }
  }
}
