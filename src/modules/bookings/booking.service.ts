import { BookingRepository } from "./booking.repository";
import {
  Booking,
  BookingWithDetails,
  CreateBookingInput,
  UpdateBookingInput,
} from "./booking.types";

export class BookingService {
  // CREATE BOOKING
  static async create(data: CreateBookingInput): Promise<Booking> {
    return BookingRepository.create(data);
  }

  // GET ALL BOOKINGS
  static async getAll(): Promise<BookingWithDetails[]> {
    return BookingRepository.getAll();
  }

  // GET BOOKING BY ID
  static async getById(id: number): Promise<BookingWithDetails | undefined> {
    return BookingRepository.getById(id);
  }

  // GET BOOKINGS BY CUSTOMER
  static async getByCustomerId(
    customerId: number,
  ): Promise<BookingWithDetails[]> {
    return BookingRepository.getByCustomerId(customerId);
  }

  // GET BOOKINGS BY BARBER
  static async getByBarberId(barberId: number): Promise<BookingWithDetails[]> {
    return BookingRepository.getByBarberId(barberId);
  }

  // UPDATE BOOKING STATUS
  static async update(
    id: number,
    data: UpdateBookingInput,
  ): Promise<Booking | undefined> {
    return BookingRepository.update(id, data);
  }

  // DELETE BOOKING
  static async deleteById(id: number): Promise<Booking | undefined> {
    return BookingRepository.deleteById(id);
  }
}
