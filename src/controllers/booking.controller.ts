import { Request, Response } from "express";
import { BookingModel } from "../models/booking.model";

// CREATE
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { shop_id, chair_id, customer_id, start_time, end_time } = req.body;

    const booking = await BookingModel.create(
      shop_id,
      chair_id,
      customer_id,
      start_time,
      end_time,
    );

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking" });
  }
};

// GET ALL
export const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.getAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error getting bookings" });
  }
};

// GET BY ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const booking = await BookingModel.getById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error getting booking" });
  }
};

// UPDATE STATUS
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const updated = await BookingModel.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking" });
  }
};

// DELETE
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deleted = await BookingModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};
