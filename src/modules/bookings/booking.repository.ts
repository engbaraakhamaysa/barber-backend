import pool from "../../config/db";
import {
  Booking,
  BookingWithDetails,
  CreateBookingInput,
  UpdateBookingInput,
} from "./booking.types";

export class BookingRepository {
  // CREATE BOOKING
  static async create(data: CreateBookingInput): Promise<Booking> {
    const sql = `
      INSERT INTO bookings (
        customer_id,
        shop_id,
        barber_id,
        booking_slot_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.customer_id,
      data.shop_id,
      data.barber_id,
      data.booking_slot_id,
    ]);

    return result.rows[0];
  }

  // GET ALL BOOKINGS
  static async getAll(): Promise<BookingWithDetails[]> {
    const sql = `
      SELECT
        b.id,
        b.customer_id,
        b.shop_id,
        b.barber_id,
        b.booking_slot_id,
        b.status,
        b.created_at,
        b.updated_at,

        c.name AS customer_name,
        c.phone AS customer_phone,

        u.name AS barber_name,

        s.name AS shop_name,

        bs.start_time,
        bs.end_time

      FROM bookings b

      INNER JOIN customers c
        ON b.customer_id = c.id

      INNER JOIN shops s
        ON b.shop_id = s.id

      INNER JOIN barbers br
        ON b.barber_id = br.id

      INNER JOIN users u
        ON br.user_id = u.id

      INNER JOIN booking_slots bs
        ON b.booking_slot_id = bs.id

      ORDER BY bs.start_time ASC
    `;

    const result = await pool.query(sql);

    return result.rows;
  }

  // GET BOOKING BY ID
  static async getById(id: number): Promise<BookingWithDetails | undefined> {
    const sql = `
      SELECT
        b.id,
        b.customer_id,
        b.shop_id,
        b.barber_id,
        b.booking_slot_id,
        b.status,
        b.created_at,
        b.updated_at,

        c.name AS customer_name,
        c.phone AS customer_phone,

        u.name AS barber_name,

        s.name AS shop_name,

        bs.start_time,
        bs.end_time

      FROM bookings b

      INNER JOIN customers c
        ON b.customer_id = c.id

      INNER JOIN shops s
        ON b.shop_id = s.id

      INNER JOIN barbers br
        ON b.barber_id = br.id

      INNER JOIN users u
        ON br.user_id = u.id

      INNER JOIN booking_slots bs
        ON b.booking_slot_id = bs.id

      WHERE b.id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // GET BOOKINGS BY CUSTOMER
  static async getByCustomerId(
    customerId: number,
  ): Promise<BookingWithDetails[]> {
    const sql = `
      SELECT
        b.id,
        b.customer_id,
        b.shop_id,
        b.barber_id,
        b.booking_slot_id,
        b.status,
        b.created_at,
        b.updated_at,

        c.name AS customer_name,
        c.phone AS customer_phone,

        u.name AS barber_name,

        s.name AS shop_name,

        bs.start_time,
        bs.end_time

      FROM bookings b

      INNER JOIN customers c
        ON b.customer_id = c.id

      INNER JOIN shops s
        ON b.shop_id = s.id

      INNER JOIN barbers br
        ON b.barber_id = br.id

      INNER JOIN users u
        ON br.user_id = u.id

      INNER JOIN booking_slots bs
        ON b.booking_slot_id = bs.id

      WHERE b.customer_id = $1

      ORDER BY bs.start_time DESC
    `;

    const result = await pool.query(sql, [customerId]);

    return result.rows;
  }

  // GET BOOKINGS BY BARBER
  static async getByBarberId(barberId: number): Promise<BookingWithDetails[]> {
    const sql = `
      SELECT
        b.id,
        b.customer_id,
        b.shop_id,
        b.barber_id,
        b.booking_slot_id,
        b.status,
        b.created_at,
        b.updated_at,

        c.name AS customer_name,
        c.phone AS customer_phone,

        u.name AS barber_name,

        s.name AS shop_name,

        bs.start_time,
        bs.end_time

      FROM bookings b

      INNER JOIN customers c
        ON b.customer_id = c.id

      INNER JOIN shops s
        ON b.shop_id = s.id

      INNER JOIN barbers br
        ON b.barber_id = br.id

      INNER JOIN users u
        ON br.user_id = u.id

      INNER JOIN booking_slots bs
        ON b.booking_slot_id = bs.id

      WHERE b.barber_id = $1

      ORDER BY bs.start_time ASC
    `;

    const result = await pool.query(sql, [barberId]);

    return result.rows;
  }

  // UPDATE BOOKING STATUS
  static async update(
    id: number,
    data: UpdateBookingInput,
  ): Promise<Booking | undefined> {
    const sql = `
      UPDATE bookings
      SET
        status = COALESCE($1, status),
        updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(sql, [data.status ?? null, id]);

    return result.rows[0];
  }

  // DELETE BOOKING
  static async deleteById(id: number): Promise<Booking | undefined> {
    const sql = `
      DELETE FROM bookings
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }
}
