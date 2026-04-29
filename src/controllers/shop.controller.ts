import { Request, Response } from "express";
import { ShopModel } from "../models/shop.model";

// CREATE
export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, email, password, location } = req.body;

    const shop = await ShopModel.create(name, email, password, location);

    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ message: "Error creating shop" });
  }
};

// GET ALL
export const getAllShops = async (_req: Request, res: Response) => {
  try {
    const shops = await ShopModel.getAll();

    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error getting shops" });
  }
};

// GET BY ID
export const getShopById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const shop = await ShopModel.getById(id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: "Error getting shop" });
  }
};

// UPDATE
export const updateShop = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, email, location } = req.body;

    const updated = await ShopModel.update(id, name, email, location);

    if (!updated) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating shop" });
  }
};

// DELETE
export const deleteShop = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deleted = await ShopModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json({
      message: "Shop deleted successfully",
      shop: deleted,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shop" });
  }
};
