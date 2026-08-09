import { Request, Response } from "express";
import { BookingService } from "./booking.service";

export class BookingController {
  ///////////////////////////////////////////
  // CREATE BOOKING
  // Create a new booking for a customer
  // Handle missing slot, unavailable slot,
  // inactive barber, and missing customer errors
  ///////////////////////////////////////////
  static async create(req: Request, res: Response) {
    const { customer_id, slot_id } = req.body;

    try {
      const booking = await BookingService.create({
        customer_id,
        slot_id,
      });

      return res.status(201).json(booking);
    } catch (error) {
      console.error("Controller error (create booking):", error);

      if (
        error instanceof Error &&
        error.message === "BOOKING_SLOT_NOT_FOUND"
      ) {
        return res.status(404).json({
          message: "Booking slot not found",
        });
      }

      if (
        error instanceof Error &&
        error.message === "BOOKING_SLOT_NOT_AVAILABLE"
      ) {
        return res.status(409).json({
          message: "Booking slot is not available",
        });
      }

      if (
        error instanceof Error &&
        error.message === "BARBER_NOT_FOUND_OR_INACTIVE"
      ) {
        return res.status(404).json({
          message: "Barber not found or is inactive",
        });
      }

      if (error instanceof Error && error.message === "CUSTOMER_NOT_FOUND") {
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      return res.status(500).json({
        message: "Failed to create booking",
      });
    }
  }

  ///////////////////////////////////////////
  // GET ALL BOOKINGS
  // Return all bookings in the system
  ///////////////////////////////////////////
  static async getAll(req: Request, res: Response) {
    try {
      const bookings = await BookingService.getAll();

      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Controller error (get bookings):", error);

      return res.status(500).json({
        message: "Failed to get bookings",
      });
    }
  }

  ///////////////////////////////////////////
  // GET BOOKING BY ID
  // Return a specific booking by ID
  ///////////////////////////////////////////
  static async getById(req: Request, res: Response) {
    const bookingId = Number(req.params.id);

    if (isNaN(bookingId)) {
      return res.status(400).json({
        message: "Invalid booking id",
      });
    }

    try {
      const booking = await BookingService.getById(bookingId);

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error("Controller error (get booking):", error);

      return res.status(500).json({
        message: "Failed to get booking",
      });
    }
  }

  ///////////////////////////////////////////
  // GET BOOKINGS BY CUSTOMER
  // Return all bookings belonging to a customer
  ///////////////////////////////////////////
  static async getByCustomerId(req: Request, res: Response) {
    const customerId = Number(req.params.customerId);

    if (isNaN(customerId)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    try {
      const bookings = await BookingService.getByCustomerId(customerId);

      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Controller error (get customer bookings):", error);

      return res.status(500).json({
        message: "Failed to get customer bookings",
      });
    }
  }

  ///////////////////////////////////////////
  // GET BOOKINGS BY BARBER
  // Return all bookings assigned to a barber
  ///////////////////////////////////////////
  static async getByBarberId(req: Request, res: Response) {
    const barberId = Number(req.params.barberId);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const bookings = await BookingService.getByBarberId(barberId);

      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Controller error (get barber bookings):", error);

      return res.status(500).json({
        message: "Failed to get barber bookings",
      });
    }
  }

  ///////////////////////////////////////////
  // UPDATE BOOKING STATUS
  // Update the status of an existing booking
  ///////////////////////////////////////////
  static async update(req: Request, res: Response) {
    const bookingId = Number(req.params.id);

    if (isNaN(bookingId)) {
      return res.status(400).json({
        message: "Invalid booking id",
      });
    }

    const { status } = req.body;

    try {
      const booking = await BookingService.update(bookingId, {
        status,
      });

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error("Controller error (update booking):", error);

      return res.status(500).json({
        message: "Failed to update booking",
      });
    }
  }

  ///////////////////////////////////////////
  // DELETE BOOKING
  // Permanently delete a booking by ID
  ///////////////////////////////////////////
  static async deleteById(req: Request, res: Response) {
    const bookingId = Number(req.params.id);

    if (isNaN(bookingId)) {
      return res.status(400).json({
        message: "Invalid booking id",
      });
    }

    try {
      const booking = await BookingService.deleteById(bookingId);

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      return res.status(200).json({
        message: "Booking deleted successfully",
        booking,
      });
    } catch (error) {
      console.error("Controller error (delete booking):", error);

      return res.status(500).json({
        message: "Failed to delete booking",
      });
    }
  }
}
