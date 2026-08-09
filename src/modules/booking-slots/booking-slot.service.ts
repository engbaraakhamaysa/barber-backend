import {
  BookingSlot,
  CreateBookingSlotInput,
  UpdateBookingSlotInput,
} from "./booking-slot.types";

import { BookingSlotRepository } from "./booking-slot.repository";

export class BookingSlotService {
  ///////////////////////////////////////////
  // CREATE
  // Create a new booking slot
  // Pass booking slot data to the repository
  ///////////////////////////////////////////
  static async create(data: CreateBookingSlotInput): Promise<BookingSlot> {
    return BookingSlotRepository.create(data);
  }

  ///////////////////////////////////////////
  // GET ALL
  // Return all booking slots
  // Retrieve booking slots from the repository
  ///////////////////////////////////////////
  static async getAll(): Promise<BookingSlot[]> {
    return BookingSlotRepository.getAll();
  }

  ///////////////////////////////////////////
  // GET BY ID
  // Return a specific booking slot by ID
  // Retrieve the booking slot from the repository
  ///////////////////////////////////////////
  static async getById(id: number): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.getById(id);
  }

  ///////////////////////////////////////////
  // GET BY BARBER
  // Return all booking slots for a specific barber
  // Retrieve slots from the repository
  ///////////////////////////////////////////
  static async getByBarberId(barberId: number): Promise<BookingSlot[]> {
    return BookingSlotRepository.getByBarberId(barberId);
  }

  ///////////////////////////////////////////
  // UPDATE
  // Update an existing booking slot
  // Pass update data to the repository
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateBookingSlotInput,
  ): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.update(id, data);
  }

  ///////////////////////////////////////////
  // DELETE
  // Permanently delete a booking slot by ID
  // Pass the delete request to the repository
  ///////////////////////////////////////////
  static async deleteById(id: number): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.deleteById(id);
  }
}
