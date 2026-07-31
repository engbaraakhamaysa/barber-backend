import { Request, Response } from "express";
import { BookingSlotService } from "./booking-slot.service";
import { UpdateBookingSlotInput } from "./booking-slot.types";

export class BookingSlotController {
  // CREATE BOOKING SLOT
  static async create(req: Request, res: Response) {
    const { barber_id, slot_time } = req.body;

    try {
      const bookingSlot = await BookingSlotService.create({
        barber_id,
        slot_time: new Date(slot_time),
      });

      return res.status(201).json(bookingSlot);
    } catch (error) {
      console.error("Controller error (create booking slot):", error);

      return res.status(500).json({
        message: "Failed to create booking slot",
      });
    }
  }

  // GET ALL
  static async getAll(req: Request, res: Response) {
    try {
      const bookingSlots = await BookingSlotService.getAll();

      return res.status(200).json(bookingSlots);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to get booking slots",
      });
    }
  }

  // GET BY ID
  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid booking slot id",
      });
    }

    try {
      const bookingSlot = await BookingSlotService.getById(id);

      if (!bookingSlot) {
        return res.status(404).json({
          message: "Booking slot not found",
        });
      }

      return res.status(200).json(bookingSlot);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to get booking slot",
      });
    }
  }

  // GET SLOTS BY BARBER
  static async getByBarberId(req: Request, res: Response) {
    const barberId = Number(req.params.barberId);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const slots = await BookingSlotService.getByBarberId(barberId);

      return res.status(200).json(slots);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to get barber slots",
      });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid booking slot id",
      });
    }

    const { slot_time } = req.body;

    const updateData: UpdateBookingSlotInput = {};

    if (slot_time !== undefined) {
      updateData.slot_time = new Date(slot_time);
    }

    try {
      const bookingSlot = await BookingSlotService.update(id, updateData);

      if (!bookingSlot) {
        return res.status(404).json({
          message: "Booking slot not found",
        });
      }

      return res.status(200).json(bookingSlot);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to update booking slot",
      });
    }
  }

  // DELETE
  static async deleteById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid booking slot id",
      });
    }

    try {
      const bookingSlot = await BookingSlotService.deleteById(id);

      if (!bookingSlot) {
        return res.status(404).json({
          message: "Booking slot not found",
        });
      }

      return res.status(200).json({
        message: "Booking slot deleted successfully",
        bookingSlot,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to delete booking slot",
      });
    }
  }
}
