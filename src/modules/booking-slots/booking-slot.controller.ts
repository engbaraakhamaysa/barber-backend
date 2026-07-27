import { Request, Response } from "express";
import { BookingSlotService } from "./booking-slot.service";

export class BookingSlotController {
  // CREATE BOOKING SLOTS
  static async createSlots(req: Request, res: Response) {
    const { barber_id, slots } = req.body;

    try {
      await BookingSlotService.createSlots({
        barber_id,
        slots,
      });

      return res.status(201).json({
        message: "Slots created successfully",
      });
    } catch (error) {
      console.error("Controller error (create slots):", error);

      return res.status(500).json({
        message: "Failed to create slots",
      });
    }
  }

  // GET ALL SLOTS BY BARBER ID
  static async getAllByBarber(req: Request, res: Response) {
    const barberId = Number(req.params.barber_id);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const slots = await BookingSlotService.getAllByBarber(barberId);

      return res.status(200).json(slots);
    } catch (error) {
      console.error("Controller error (get slots):", error);

      return res.status(500).json({
        message: "Failed to get slots",
      });
    }
  }

  // GET SLOT BY ID
  static async getById(req: Request, res: Response) {
    const slotId = Number(req.params.id);

    if (isNaN(slotId)) {
      return res.status(400).json({
        message: "Invalid slot id",
      });
    }

    try {
      const slot = await BookingSlotService.getById(slotId);

      if (!slot) {
        return res.status(404).json({
          message: "Slot not found",
        });
      }

      return res.status(200).json(slot);
    } catch (error) {
      console.error("Controller error (get slot):", error);

      return res.status(500).json({
        message: "Failed to get slot",
      });
    }
  }

  // DELETE SLOT
  static async deleteById(req: Request, res: Response) {
    const slotId = Number(req.params.id);

    if (isNaN(slotId)) {
      return res.status(400).json({
        message: "Invalid slot id",
      });
    }

    try {
      const slot = await BookingSlotService.deleteById(slotId);

      if (!slot) {
        return res.status(404).json({
          message: "Slot not found",
        });
      }

      return res.status(200).json({
        message: "Slot deleted successfully",
        slot,
      });
    } catch (error) {
      console.error("Controller error (delete slot):", error);

      return res.status(500).json({
        message: "Failed to delete slot",
      });
    }
  }

  // BOOK SLOT
  static async bookSlot(req: Request, res: Response) {
    const { slot_id, customer_name, customer_phone } = req.body;

    try {
      const slot = await BookingSlotService.bookSlot({
        slot_id,
        customer_name,
        customer_phone,
      });

      if (!slot) {
        return res.status(409).json({
          message: "Slot not found or already booked",
        });
      }

      return res.status(200).json(slot);
    } catch (error) {
      console.error("Controller error (book slot):", error);

      return res.status(500).json({
        message: "Failed to book slot",
      });
    }
  }
}
