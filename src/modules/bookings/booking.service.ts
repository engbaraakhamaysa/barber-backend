import { BookingRepository } from "./booking.repository";

import {
  Booking,
  BookingWithDetails,
  CreateBookingInput,
  UpdateBookingInput,
} from "./booking.types";

export class BookingService {
  static async create(data: CreateBookingInput): Promise<Booking> {
    return BookingRepository.create(data);
  }

  static async getAll(): Promise<BookingWithDetails[]> {
    return BookingRepository.getAll();
  }

  static async getById(id: number): Promise<BookingWithDetails | undefined> {
    return BookingRepository.getById(id);
  }

  static async getByCustomerId(
    customerId: number,
  ): Promise<BookingWithDetails[]> {
    return BookingRepository.getByCustomerId(customerId);
  }

  static async getByBarberId(barberId: number): Promise<BookingWithDetails[]> {
    return BookingRepository.getByBarberId(barberId);
  }

  static async update(
    id: number,
    data: UpdateBookingInput,
  ): Promise<Booking | undefined> {
    return BookingRepository.update(id, data);
  }

  static async deleteById(id: number): Promise<Booking | undefined> {
    return BookingRepository.deleteById(id);
  }
}
