import { BookingRepository } from "./booking.repository";

import {
  Booking,
  BookingWithDetails,
  CreateBookingInput,
  UpdateBookingInput,
} from "./booking.types";

export class BookingService {
  ///////////////////////////////////////////
  // CREATE BOOKING
  // Create a new booking through the repository
  ///////////////////////////////////////////
  static async create(data: CreateBookingInput): Promise<Booking> {
    return BookingRepository.create(data);
  }

  ///////////////////////////////////////////
  // GET ALL BOOKINGS
  // Return all bookings with detailed information
  ///////////////////////////////////////////
  static async getAll(): Promise<BookingWithDetails[]> {
    return BookingRepository.getAll();
  }

  ///////////////////////////////////////////
  // GET BOOKING BY ID
  // Return a specific booking with detailed information
  ///////////////////////////////////////////
  static async getById(id: number): Promise<BookingWithDetails | undefined> {
    return BookingRepository.getById(id);
  }

  ///////////////////////////////////////////
  // GET BOOKINGS BY CUSTOMER
  // Return all bookings belonging to a customer
  ///////////////////////////////////////////
  static async getByCustomerId(
    customerId: number,
  ): Promise<BookingWithDetails[]> {
    return BookingRepository.getByCustomerId(customerId);
  }

  ///////////////////////////////////////////
  // GET BOOKINGS BY BARBER
  // Return all bookings assigned to a barber
  ///////////////////////////////////////////
  static async getByBarberId(barberId: number): Promise<BookingWithDetails[]> {
    return BookingRepository.getByBarberId(barberId);
  }

  ///////////////////////////////////////////
  // UPDATE BOOKING
  // Update booking information through the repository
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateBookingInput,
  ): Promise<Booking | undefined> {
    return BookingRepository.update(id, data);
  }

  ///////////////////////////////////////////
  // DELETE BOOKING
  // Permanently delete a booking by ID
  ///////////////////////////////////////////
  static async deleteById(id: number): Promise<Booking | undefined> {
    return BookingRepository.deleteById(id);
  }
}
