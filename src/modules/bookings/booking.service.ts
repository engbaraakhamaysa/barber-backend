import pool from "../../config/db";
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
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // 1. Check if booking slot exists and is available
      const slotResult = await client.query(
        `
          SELECT
            id,
            shop_id,
            barber_id,
            is_available,
            start_time,
            end_time
          FROM booking_slots
          WHERE id = $1
          FOR UPDATE
        `,
        [data.booking_slot_id],
      );

      if (slotResult.rows.length === 0) {
        throw new Error("BOOKING_SLOT_NOT_FOUND");
      }

      const slot = slotResult.rows[0];

      // 2. Check slot availability
      if (!slot.is_available) {
        throw new Error("BOOKING_SLOT_NOT_AVAILABLE");
      }

      // 3. Make sure slot belongs to the selected shop
      if (slot.shop_id !== data.shop_id) {
        throw new Error("BOOKING_SLOT_SHOP_MISMATCH");
      }

      // 4. Make sure slot belongs to the selected barber
      if (slot.barber_id !== data.barber_id) {
        throw new Error("BOOKING_SLOT_BARBER_MISMATCH");
      }

      // 5. Check barber exists
      const barberResult = await client.query(
        `
          SELECT id
          FROM barbers
          WHERE id = $1
            AND shop_id = $2
            AND is_active = true
        `,
        [data.barber_id, data.shop_id],
      );

      if (barberResult.rows.length === 0) {
        throw new Error("BARBER_NOT_FOUND_OR_INACTIVE");
      }

      // 6. Check customer exists
      const customerResult = await client.query(
        `
          SELECT id
          FROM customers
          WHERE id = $1
        `,
        [data.customer_id],
      );

      if (customerResult.rows.length === 0) {
        throw new Error("CUSTOMER_NOT_FOUND");
      }

      // 7. Create booking
      const bookingResult = await client.query(
        `
          INSERT INTO bookings (
            customer_id,
            shop_id,
            barber_id,
            booking_slot_id,
            status
          )
          VALUES ($1, $2, $3, $4, 'confirmed')
          RETURNING *
        `,
        [data.customer_id, data.shop_id, data.barber_id, data.booking_slot_id],
      );

      // 8. Mark slot as unavailable
      await client.query(
        `
          UPDATE booking_slots
          SET
            is_available = false,
            updated_at = NOW()
          WHERE id = $1
        `,
        [data.booking_slot_id],
      );

      await client.query("COMMIT");

      return bookingResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
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
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // 1. Get the booking
      const bookingResult = await client.query(
        `
        SELECT
          id,
          booking_slot_id,
          status
        FROM bookings
        WHERE id = $1
        FOR UPDATE
      `,
        [id],
      );

      if (bookingResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return undefined;
      }

      const booking = bookingResult.rows[0];

      // 2. Update booking status
      const updatedBookingResult = await client.query(
        `
          UPDATE bookings
          SET
            status = COALESCE($1, status),
            updated_at = NOW()
          WHERE id = $2
          RETURNING *
        `,
        [data.status ?? null, id],
      );

      // 3. If booking is cancelled,
      // make the booking slot available again
      if (data.status === "cancelled" && booking.status !== "cancelled") {
        await client.query(
          `
          UPDATE booking_slots
          SET
            is_available = true,
            updated_at = NOW()
          WHERE id = $1
        `,
          [booking.booking_slot_id],
        );
      }

      await client.query("COMMIT");

      return updatedBookingResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // DELETE BOOKING
  static async deleteById(id: number): Promise<Booking | undefined> {
    return BookingRepository.deleteById(id);
  }
}
