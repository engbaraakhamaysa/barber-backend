import { Request, Response } from "express";
import { BarberService } from "./barber.service";

export class BarberController {
  ///////////////////////////////////////////
  // CREATE BARBER
  // Receive barber data and call service
  // Return created barber response
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET BARBER BY ID
  // Validate barber id from params
  // Return barber data if exists
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET BARBERS BY SHOP ID
  // Validate shop id from params
  // Return all barbers assigned to shop
  ///////////////////////////////////////////
  static async getByShopId(req: Request, res: Response) {
    const shopId = Number(req.params.shopId);

    if (isNaN(shopId)) {
      return res.status(400).json({
        message: "Invalid shop id",
      });
    }

    try {
      const barbers = await BarberService.getByShopId(shopId);

      return res.status(200).json(barbers);
    } catch (error) {
      console.error("Controller error (get barbers by shop):", error);

      return res.status(500).json({
        message: "Failed to get barbers",
      });
    }
  }

  ///////////////////////////////////////////
  // UPDATE BARBER
  // Validate id and update provided fields
  // Return updated barber response
  ///////////////////////////////////////////
  static async update(req: Request, res: Response) {
    const barberId = Number(req.params.id);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    const { name, email, password, is_active } = req.body;

    try {
      const barber = await BarberService.update(barberId, {
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

  ///////////////////////////////////////////
  // DELETE BARBER
  // Validate id and remove barber
  // Return deletion result
  ///////////////////////////////////////////
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
}
