import pool from "../../config/db";

import {
  Booking,
  BookingWithDetails,
  CreateBookingInput,
  UpdateBookingInput,
} from "./booking.types";

export class BookingRepository {
  ///////////////////////////////////////////
  // CREATE BOOKING
  // Create a booking for a customer
  // Validates the booking slot exists
  // Validates the customer exists
  // Uses a transaction to ensure data consistency
  ///////////////////////////////////////////
  static async create(data: CreateBookingInput): Promise<Booking> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Check booking slot
      const slotResult = await client.query(
        `
        SELECT id
        FROM booking_slots
        WHERE id=$1
        `,
        [data.slot_id],
      );

      if (slotResult.rows.length === 0) {
        throw new Error("BOOKING_SLOT_NOT_FOUND");
      }

      // Check customer
      const customerResult = await client.query(
        `
        SELECT id
        FROM customers
        WHERE id=$1
        `,
        [data.customer_id],
      );

      if (customerResult.rows.length === 0) {
        throw new Error("CUSTOMER_NOT_FOUND");
      }

      // Create booking
      const bookingResult = await client.query(
        `
        INSERT INTO bookings(
          customer_id,
          slot_id,
          status
        )
        VALUES($1,$2,'confirmed')
        RETURNING *
        `,
        [data.customer_id, data.slot_id],
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

  ///////////////////////////////////////////
  // GET ALL BOOKINGS
  // Return all bookings with customer,
  // barber, and booking slot information
  // Results are ordered by slot time
  ///////////////////////////////////////////
  static async getAll(): Promise<BookingWithDetails[]> {
    const result = await pool.query(
      `
      SELECT

        b.id,
        b.customer_id,
        b.slot_id,
        b.status,
        b.created_at,
        b.updated_at,


        c.name AS customer_name,
        c.phone AS customer_phone,


        u.name AS barber_name,


        bs.slot_time


      FROM bookings b


      INNER JOIN customers c
      ON b.customer_id = c.id


      INNER JOIN booking_slots bs
      ON b.slot_id = bs.id


      INNER JOIN barbers br
      ON bs.barber_id = br.id


      INNER JOIN users u
      ON br.user_id = u.id


      ORDER BY bs.slot_time ASC
      `,
    );

    return result.rows;
  }

  ///////////////////////////////////////////
  // GET BOOKING BY ID
  // Return a specific booking by ID
  // Includes customer, barber, and slot information
  ///////////////////////////////////////////
  static async getById(id: number): Promise<BookingWithDetails | undefined> {
    const result = await pool.query(
      `
      SELECT

        b.id,
        b.customer_id,
        b.slot_id,
        b.status,
        b.created_at,
        b.updated_at,


        c.name AS customer_name,
        c.phone AS customer_phone,


        u.name AS barber_name,


        bs.slot_time


      FROM bookings b


      INNER JOIN customers c
      ON b.customer_id = c.id


      INNER JOIN booking_slots bs
      ON b.slot_id = bs.id


      INNER JOIN barbers br
      ON bs.barber_id = br.id


      INNER JOIN users u
      ON br.user_id = u.id


      WHERE b.id=$1
      `,
      [id],
    );

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // GET BOOKINGS BY CUSTOMER
  // Return all bookings belonging to a customer
  // Results are ordered by creation date
  ///////////////////////////////////////////
  static async getByCustomerId(
    customerId: number,
  ): Promise<BookingWithDetails[]> {
    const result = await pool.query(
      `
      SELECT

        b.id,
        b.customer_id,
        b.slot_id,
        b.status,
        b.created_at,
        b.updated_at,


        bs.barber_id,
        bs.slot_time


      FROM bookings b


      INNER JOIN booking_slots bs
      ON b.slot_id = bs.id


      WHERE b.customer_id=$1


      ORDER BY b.created_at DESC
      `,
      [customerId],
    );

    return result.rows;
  }

  ///////////////////////////////////////////
  // GET BOOKINGS BY BARBER
  // Return all bookings assigned to a barber
  // Results are ordered by creation date
  ///////////////////////////////////////////
  static async getByBarberId(barberId: number): Promise<BookingWithDetails[]> {
    const result = await pool.query(
      `
      SELECT

        b.id,
        b.customer_id,
        b.slot_id,
        b.status,
        b.created_at,
        b.updated_at,


        bs.barber_id,
        bs.slot_time


      FROM bookings b


      INNER JOIN booking_slots bs
      ON b.slot_id = bs.id


      WHERE bs.barber_id=$1


      ORDER BY b.created_at DESC
      `,
      [barberId],
    );

    return result.rows;
  }

  ///////////////////////////////////////////
  // UPDATE BOOKING
  // Update the booking status
  // Automatically update the modification timestamp
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateBookingInput,
  ): Promise<Booking | undefined> {
    const result = await pool.query(
      `
      UPDATE bookings

      SET
        status=COALESCE($1,status),
        updated_at=NOW()

      WHERE id=$2


      RETURNING *
      `,
      [data.status ?? null, id],
    );

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // DELETE BOOKING
  // Permanently delete a booking by ID
  ///////////////////////////////////////////
  static async deleteById(id: number): Promise<Booking | undefined> {
    const result = await pool.query(
      `
      DELETE FROM bookings

      WHERE id=$1


      RETURNING *
      `,
      [id],
    );

    return result.rows[0];
  }
}
