import { ShopModel } from "../models/shop.model";
import { Request, Response } from "express";

export class ShopController {
  static async getAll(req: Request, res: Response) {
    try {
      const shops = await ShopModel.getAll();
      res.status(200).json(shops);
    } catch (error) {
      console.error("Controller Error (getAll):", error);
      res.status(500).json({ message: "Failed to get shops" });
    }
  }

  static async create(req: Request, res: Response) {
    const { name, location } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    try {
      const shop = await ShopModel.create(name, location);
      res.status(201).json(shop);
    } catch (error) {
      console.error("Controller error (create):", error);
      res.status(500).json({ message: "Failed to create shop" });
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const shop = await ShopModel.getById(Number(id));

      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }

      res.status(200).json(shop);
    } catch (error) {
      console.error("Controller error (getById):", error);
      res.status(500).json({ message: "Failed to get shop" });
    }
  }

  static async deleteByID(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const shop = await ShopModel.deleteById(Number(id));

      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }

      return res.status(200).json({
        message: "Shop deleted successfully",
        shop,
      });
    } catch (error) {
      console.error("Controller error (deleteById):", error);
      res.status(500).json({ message: "Failed to delete shop" });
    }
  }
}
