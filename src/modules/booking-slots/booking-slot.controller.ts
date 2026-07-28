import { Request, Response } from "express";
import { BookingSlotService } from "./booking-slot.service";
import { UpdateBookingSlotInput } from "./booking-slot.types";

export class BookingSlotController {
  // CREATE BOOKING SLOT
  static async create(req: Request, res: Response) {
    const { shop_id, barber_id, start_time, end_time } = req.body;

    try {
      const bookingSlot = await BookingSlotService.create({
        shop_id,
        barber_id,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
      });

      return res.status(201).json(bookingSlot);
    } catch (error) {
      console.error("Controller error (create booking slot):", error);

      return res.status(500).json({
        message: "Failed to create booking slot",
      });
    }
  }

  // GET ALL BOOKING SLOTS
  static async getAll(req: Request, res: Response) {
    try {
      const bookingSlots = await BookingSlotService.getAll();

      return res.status(200).json(bookingSlots);
    } catch (error) {
      console.error("Controller error (get booking slots):", error);

      return res.status(500).json({
        message: "Failed to get booking slots",
      });
    }
  }

  // GET BOOKING SLOT BY ID
  static async getById(req: Request, res: Response) {
    const slotId = Number(req.params.id);

    if (isNaN(slotId)) {
      return res.status(400).json({
        message: "Invalid booking slot id",
      });
    }

    try {
      const bookingSlot = await BookingSlotService.getById(slotId);

      if (!bookingSlot) {
        return res.status(404).json({
          message: "Booking slot not found",
        });
      }

      return res.status(200).json(bookingSlot);
    } catch (error) {
      console.error("Controller error (get booking slot):", error);

      return res.status(500).json({
        message: "Failed to get booking slot",
      });
    }
  }

  // GET AVAILABLE SLOTS BY SHOP
  static async getAvailableByShopId(req: Request, res: Response) {
    const shopId = Number(req.params.shopId);

    if (isNaN(shopId)) {
      return res.status(400).json({
        message: "Invalid shop id",
      });
    }

    try {
      const bookingSlots =
        await BookingSlotService.getAvailableByShopId(shopId);

      return res.status(200).json(bookingSlots);
    } catch (error) {
      console.error("Controller error (get available slots by shop):", error);

      return res.status(500).json({
        message: "Failed to get available booking slots",
      });
    }
  }

  // GET AVAILABLE SLOTS BY BARBER
  static async getAvailableByBarberId(req: Request, res: Response) {
    const barberId = Number(req.params.barberId);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const bookingSlots =
        await BookingSlotService.getAvailableByBarberId(barberId);

      return res.status(200).json(bookingSlots);
    } catch (error) {
      console.error("Controller error (get available slots by barber):", error);

      return res.status(500).json({
        message: "Failed to get available booking slots",
      });
    }
  }

  // UPDATE BOOKING SLOT
  static async update(req: Request, res: Response) {
    const slotId = Number(req.params.id);

    if (isNaN(slotId)) {
      return res.status(400).json({
        message: "Invalid booking slot id",
      });
    }

    const { start_time, end_time, is_available } = req.body;

    const updateData: UpdateBookingSlotInput = {};

    if (start_time !== undefined) {
      updateData.start_time = new Date(start_time);
    }

    if (end_time !== undefined) {
      updateData.end_time = new Date(end_time);
    }

    if (is_available !== undefined) {
      updateData.is_available = is_available;
    }

    try {
      const bookingSlot = await BookingSlotService.update(slotId, updateData);

      if (!bookingSlot) {
        return res.status(404).json({
          message: "Booking slot not found",
        });
      }

      return res.status(200).json(bookingSlot);
    } catch (error) {
      console.error("Controller error (update booking slot):", error);

      return res.status(500).json({
        message: "Failed to update booking slot",
      });
    }
  }

  // DELETE BOOKING SLOT
  static async deleteById(req: Request, res: Response) {
    const slotId = Number(req.params.id);

    if (isNaN(slotId)) {
      return res.status(400).json({
        message: "Invalid booking slot id",
      });
    }

    try {
      const bookingSlot = await BookingSlotService.deleteById(slotId);

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
      console.error("Controller error (delete booking slot):", error);

      return res.status(500).json({
        message: "Failed to delete booking slot",
      });
    }
  }
}
