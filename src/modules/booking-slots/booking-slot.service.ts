import { BookingSlotRepository } from "./booking-slot.repository";
import {
  BookingSlot,
  CreateBookingSlotInput,
  UpdateBookingSlotInput,
} from "./booking-slot.types";

export class BookingSlotService {
  // CREATE BOOKING SLOT
  static async create(data: CreateBookingSlotInput): Promise<BookingSlot> {
    return BookingSlotRepository.create(data);
  }

  // GET ALL BOOKING SLOTS
  static async getAll(): Promise<BookingSlot[]> {
    return BookingSlotRepository.getAll();
  }

  // GET BOOKING SLOT BY ID
  static async getById(id: number): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.getById(id);
  }

  // GET AVAILABLE SLOTS BY SHOP
  static async getAvailableByShopId(shopId: number): Promise<BookingSlot[]> {
    return BookingSlotRepository.getAvailableByShopId(shopId);
  }

  // GET AVAILABLE SLOTS BY BARBER
  static async getAvailableByBarberId(
    barberId: number,
  ): Promise<BookingSlot[]> {
    return BookingSlotRepository.getAvailableByBarberId(barberId);
  }

  // UPDATE BOOKING SLOT
  static async update(
    id: number,
    data: UpdateBookingSlotInput,
  ): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.update(id, data);
  }

  // DELETE BOOKING SLOT
  static async deleteById(id: number): Promise<BookingSlot | undefined> {
    return BookingSlotRepository.deleteById(id);
  }
}
