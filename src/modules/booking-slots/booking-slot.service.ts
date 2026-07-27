import { BookingSlotRepository } from "./booking-slot.repository";
import {
  BookingSlot,
  BookSlotInput,
  CreateBookingSlotsInput,
} from "./booking-slot.types";

export class BookingSlotService {
  // CREATE BOOKING SLOTS
  static async createSlots(data: CreateBookingSlotsInput): Promise<void> {
    await BookingSlotRepository.createSlots(data.barber_id, data.slots);
  }

  // GET ALL SLOTS BY BARBER ID
  static async getAllByBarber(barberId: number): Promise<BookingSlot[]> {
    return BookingSlotRepository.getAllByBarber(barberId);
  }

  // GET SLOT BY ID
  static async getById(id: number): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.getById(id);
  }

  // DELETE SLOT
  static async deleteById(id: number): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.deleteById(id);
  }

  // BOOK SLOT
  static async bookSlot(data: BookSlotInput): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.bookSlot(data);
  }
}
