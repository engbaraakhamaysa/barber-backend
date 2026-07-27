import { Request, Response } from "express";
import { BarberService } from "./barber.service";

export class BarberController {
  // CREATE BARBER
  static async create(req: Request, res: Response) {
    const { shop_id, name, email, password } = req.body;

    try {
      const barber = await BarberService.create({
        shop_id,
        name,
        email,
        password,
      });

      return res.status(201).json(barber);
    } catch (error) {
      console.error("Controller error (create barber):", error);

      return res.status(500).json({
        message: "Failed to create barber",
      });
    }
  }

  // GET BARBERS BY SHOP ID
  static async getByShopId(req: Request, res: Response) {
    const shopId = Number(req.params.id);

    if (isNaN(shopId)) {
      return res.status(400).json({
        message: "Invalid shop id",
      });
    }

    try {
      const barbers = await BarberService.getByShopId(shopId);

      return res.status(200).json(barbers);
    } catch (error) {
      console.error("Controller error (get barbers):", error);

      return res.status(500).json({
        message: "Failed to get barbers",
      });
    }
  }

  // GET BARBER BY ID
  static async getById(req: Request, res: Response) {
    const barberId = Number(req.params.id);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const barber = await BarberService.getById(barberId);

      if (!barber) {
        return res.status(404).json({
          message: "Barber not found",
        });
      }

      return res.status(200).json(barber);
    } catch (error) {
      console.error("Controller error (get barber):", error);

      return res.status(500).json({
        message: "Failed to get barber",
      });
    }
  }

  // UPDATE BARBER
  static async update(req: Request, res: Response) {
    const { id, name, email, password, is_active } = req.body;

    try {
      const barber = await BarberService.update(id, {
        name,
        email,
        password,
        is_active,
      });

      if (!barber) {
        return res.status(404).json({
          message: "Barber not found",
        });
      }

      return res.status(200).json(barber);
    } catch (error) {
      console.error("Controller error (update barber):", error);

      return res.status(500).json({
        message: "Failed to update barber",
      });
    }
  }

  // DELETE BARBER
  static async deleteById(req: Request, res: Response) {
    const barberId = Number(req.params.id);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const barber = await BarberService.deleteById(barberId);

      if (!barber) {
        return res.status(404).json({
          message: "Barber not found",
        });
      }

      return res.status(200).json({
        message: "Barber deleted successfully",
        barber,
      });
    } catch (error) {
      console.error("Controller error (delete barber):", error);

      return res.status(500).json({
        message: "Failed to delete barber",
      });
    }
  }

  // LOGIN BARBER
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const barber = await BarberService.login({
        email,
        password,
      });

      if (!barber) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      return res.status(200).json(barber);
    } catch (error) {
      console.error("Controller error (login barber):", error);

      return res.status(500).json({
        message: "Login failed",
      });
    }
  }
}
