import { Request, Response } from "express";
import { ChairModel } from "../models/chair.model";

// CREATE
export const createChair = async (req: Request, res: Response) => {
  try {
    const { shop_id, name, type } = req.body;

    const chair = await ChairModel.create(shop_id, name, type);

    res.status(201).json(chair);
  } catch (error) {
    res.status(500).json({ message: "Error creating chair" });
  }
};

// GET ALL
export const getAllChairs = async (_req: Request, res: Response) => {
  try {
    const chairs = await ChairModel.getAll();
    res.json(chairs);
  } catch (error) {
    res.status(500).json({ message: "Error getting chairs" });
  }
};

// GET BY ID
export const getChairById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const chair = await ChairModel.getById(id);

    if (!chair) {
      return res.status(404).json({ message: "Chair not found" });
    }

    res.json(chair);
  } catch (error) {
    res.status(500).json({ message: "Error getting chair" });
  }
};

// UPDATE
export const updateChair = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, type, is_active } = req.body;

    const chair = await ChairModel.update(id, name, type, is_active);

    if (!chair) {
      return res.status(404).json({ message: "Chair not found" });
    }

    res.json(chair);
  } catch (error) {
    res.status(500).json({ message: "Error updating chair" });
  }
};

// DELETE
export const deleteChair = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const chair = await ChairModel.delete(id);

    if (!chair) {
      return res.status(404).json({ message: "Chair not found" });
    }

    res.json({ message: "Chair deleted", chair });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chair" });
  }
};
