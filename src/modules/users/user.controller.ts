import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  ///////////////////////////////////////////
  // CREATE USER
  // Receive user data and call service
  // Return created user response
  ///////////////////////////////////////////
  static async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      const user = await UserService.create({
        name,
        email,
        password,
        role,
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error("Controller error (create user):", error);

      return res.status(500).json({
        message: "Failed to create user",
      });
    }
  }

  ///////////////////////////////////////////
  // GET USER BY ID
  // Validate user id from params
  // Return user data if exists
  ///////////////////////////////////////////
  static async getById(req: Request, res: Response) {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    try {
      const user = await UserService.getById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Controller error (get user):", error);

      return res.status(500).json({
        message: "Failed to get user",
      });
    }
  }

  ///////////////////////////////////////////
  // UPDATE USER
  // Validate id and update provided fields
  // Return updated user response
  ///////////////////////////////////////////
  static async update(req: Request, res: Response) {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    const { name, email, password, is_active } = req.body;

    try {
      const user = await UserService.update(userId, {
        name,
        email,
        password,
        is_active,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Controller error (update user):", error);

      return res.status(500).json({
        message: "Failed to update user",
      });
    }
  }

  ///////////////////////////////////////////
  // DELETE USER
  // Validate id and remove user
  // Return deletion result
  ///////////////////////////////////////////
  static async deleteById(req: Request, res: Response) {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    try {
      const user = await UserService.deleteById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "User deleted successfully",
        user,
      });
    } catch (error) {
      console.error("Controller error (delete user):", error);

      return res.status(500).json({
        message: "Failed to delete user",
      });
    }
  }
}
