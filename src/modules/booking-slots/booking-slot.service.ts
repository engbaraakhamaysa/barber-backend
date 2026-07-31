import {
  BookingSlot,
  CreateBookingSlotInput,
  UpdateBookingSlotInput,
} from "./booking-slot.types";

import { BookingSlotRepository } from "./booking-slot.repository";

export class BookingSlotService {
  // CREATE
  static async create(data: CreateBookingSlotInput): Promise<BookingSlot> {
    return BookingSlotRepository.create(data);
  }

  // GET ALL
  static async getAll(): Promise<BookingSlot[]> {
    return BookingSlotRepository.getAll();
  }

  // GET BY ID
  static async getById(id: number): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.getById(id);
  }

  // GET BY BARBER
  static async getByBarberId(barberId: number): Promise<BookingSlot[]> {
    return BookingSlotRepository.getByBarberId(barberId);
  }

  // UPDATE
  static async update(
    id: number,
    data: UpdateBookingSlotInput,
  ): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.update(id, data);
  }

  // DELETE
  static async deleteById(id: number): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.deleteById(id);
  }
}
