import { Request, Response } from "express";
import { QueueModel } from "../models/queue.model";

// CREATE
export const createQueue = async (req: Request, res: Response) => {
  try {
    const { shop_id, chair_id, customer_id } = req.body;

    // نحسب آخر position + 1
    const all = await QueueModel.getAll();
    const position = all.length + 1;

    const queue = await QueueModel.create(
      shop_id,
      chair_id,
      customer_id,
      position,
    );

    res.status(201).json(queue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating queue entry" });
  }
};

// GET ALL
export const getAllQueue = async (_req: Request, res: Response) => {
  try {
    const queue = await QueueModel.getAll();
    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: "Error getting queue" });
  }
};

// GET BY ID
export const getQueueById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const entry = await QueueModel.getById(id);

    if (!entry) {
      return res.status(404).json({ message: "Queue entry not found" });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: "Error getting queue entry" });
  }
};

// UPDATE STATUS
export const updateQueueStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const updated = await QueueModel.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({ message: "Queue entry not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating queue status" });
  }
};

// DELETE
export const deleteQueue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deleted = await QueueModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Queue entry not found" });
    }

    res.json({ message: "Queue deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting queue entry" });
  }
};
