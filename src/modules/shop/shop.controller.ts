import { Request, Response } from "express";
import { ShopService } from "./shop.service";

export class ShopController {
  // CREATE SHOP
  static async create(req: Request, res: Response) {
    const { name, location } = req.body;

    try {
      const shop = await ShopService.create(name, location);

      return res.status(201).json(shop);
    } catch (error) {
      console.error("Controller error (create):", error);

      return res.status(500).json({
        message: "Failed to create shop",
      });
    }
  }

  // GET ALL SHOPS
  static async getAll(req: Request, res: Response) {
    try {
      const shops = await ShopService.getAll();

      return res.status(200).json(shops);
    } catch (error) {
      console.error("Controller error (getAll):", error);

      return res.status(500).json({
        message: "Failed to get shops",
      });
    }
  }

  // GET SHOP BY ID
  static async getById(req: Request, res: Response) {
    const shopId = Number(req.params.id);

    if (isNaN(shopId)) {
      return res.status(400).json({
        message: "Invalid shop id",
      });
    }

    try {
      const shop = await ShopService.getById(shopId);

      if (!shop) {
        return res.status(404).json({
          message: "Shop not found",
        });
      }

      return res.status(200).json(shop);
    } catch (error) {
      console.error("Controller error (getById):", error);

      return res.status(500).json({
        message: "Failed to get shop",
      });
    }
  }

  // DELETE SHOP BY ID
  static async deleteById(req: Request, res: Response) {
    const shopId = Number(req.params.id);

    if (isNaN(shopId)) {
      return res.status(400).json({
        message: "Invalid shop id",
      });
    }

    try {
      const shop = await ShopService.deleteById(shopId);

      if (!shop) {
        return res.status(404).json({
          message: "Shop not found",
        });
      }

      return res.status(200).json({
        message: "Shop deleted successfully",
        shop,
      });
    } catch (error) {
      console.error("Controller error (deleteById):", error);

      return res.status(500).json({
        message: "Failed to delete shop",
      });
    }
  }
}
