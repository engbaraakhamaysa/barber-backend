import { Request, Response } from "express";
import { BarberModel } from "../models/barber.model";

export class BarberController {
  /////////////////////////////////////////////////////////
  //                 CREATE NEW BARBER                   //
  /////////////////////////////////////////////////////////

  static async create(req: Request, res: Response) {
    const { shop_id, name, email, password } = req.body;

    if (!shop_id || !name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    try {
      const barber = await BarberModel.create(shop_id, name, email, password);
      return res.status(201).json(barber);
    } catch (error) {
      console.error("Controller create barber error", error);
      return res.status(500).json({
        message: "Failed to create barber",
      });
    }
  }

  /////////////////////////////////////////////////////////
  //              GET BARBERS BY SHOP ID                //
  /////////////////////////////////////////////////////////

  static async getByShopId(req: Request, res: Response) {
    const { id } = req.params;

    const shopId = Number(id);

    if (isNaN(shopId)) {
      return res.status(400).json({ message: "Invalid shop id" });
    }

    try {
      const barbers = await BarberModel.getByShopId(shopId);

      return res.status(200).json(barbers);
    } catch (error) {
      console.error("Controller get barbers error", error);
      return res.status(500).json({
        message: "Failed to get barbers",
      });
    }
  }

  /////////////////////////////////////////////////////////
  //                   UPDATE BARBER                     //
  /////////////////////////////////////////////////////////

  static async update(req: Request, res: Response) {
    console.log("BODY:", req.body);
    const { id, name, email, password, is_active } = req.body;

    if (
      id === undefined ||
      !name ||
      !email ||
      !password ||
      is_active === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    try {
      const barber = await BarberModel.update(
        id,
        name,
        email,
        password,
        is_active,
      );

      return res.status(200).json(barber);
    } catch (error) {
      console.error("Controller update barber error", error);
      return res.status(500).json({
        message: "Failed to update barber",
      });
    }
  }

  /////////////////////////////////////////////////////////
  //                   DELETE BARBER                     //
  /////////////////////////////////////////////////////////

  static async deleteById(req: Request, res: Response) {
    const { id } = req.params;

    const barberId = Number(id);

    if (isNaN(barberId)) {
      return res.status(400).json({ message: "Invalid barber id" });
    }

    try {
      const barber = await BarberModel.deleteById(Number(barberId));

      return res.status(200).json(barber);
    } catch (error) {
      console.error("Controller delete barber error", error);

      return res.status(500).json({
        message: "Failed to delete barber",
      });
    }
  }
}
