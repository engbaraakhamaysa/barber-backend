import { Request, Response } from "express";
import { BookingSlotModel } from "../models/bookingSlot.model";

export class BookingSlotController {
  static async createSlots(req: Request, res: Response) {
    const { barber_id, slots } = req.body;

    if (!barber_id || !Array.isArray(slots)) {
      return res.status(400).json({ message: "Invalid data" });
    }

    try {
      const result = await BookingSlotModel.createSlots(
        Number(barber_id),
        slots,
      );

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create slots" });
    }
  }

  static async getAllByBarber(req: Request, res: Response) {
    const id = Number(req.params.barber_id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid barber id" });
    }

    try {
      const slots = await BookingSlotModel.getAllByBarber(id);
      return res.status(200).json(slots);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch slots" });
    }
  }

  static async deleteSlot(req: Request, res: Response) {
    const id = Number(req.params.slot_id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid slot id" });
    }

    try {
      const deleted = await BookingSlotModel.deleteSlot(id);
      return res.status(200).json(deleted);
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete slot" });
    }
  }

  static async bookSlot(req: Request, res: Response) {
    const { slot_id, customer_name, customer_phone } = req.body;

    if (!slot_id || !customer_name) {
      return res.status(400).json({ message: "Missing data" });
    }

    try {
      const result = await BookingSlotModel.bookSlot(
        Number(slot_id),
        customer_name,
        customer_phone,
      );

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
