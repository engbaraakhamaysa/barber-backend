import pool from "../../config/db";
import {
  Booking,
  BookingWithDetails,
  CreateBookingInput,
  UpdateBookingInput,
} from "./booking.types";

export class BookingRepository {
  // CREATE BOOKING WITH TRANSACTION
  static async create(data: CreateBookingInput): Promise<Booking> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // 1. Check slot exists and lock it
      const slotResult = await client.query(
        `
        SELECT
          id,
          shop_id,
          barber_id,
          is_available
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

      // 3. Check shop match
      if (slot.shop_id !== data.shop_id) {
        throw new Error("BOOKING_SLOT_SHOP_MISMATCH");
      }

      // 4. Check barber match
      if (slot.barber_id !== data.barber_id) {
        throw new Error("BOOKING_SLOT_BARBER_MISMATCH");
      }

      // 5. Check barber
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

      // 6. Check customer
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
        VALUES ($1,$2,$3,$4,'confirmed')
        RETURNING *
        `,
        [data.customer_id, data.shop_id, data.barber_id, data.booking_slot_id],
      );

      // 8. Disable slot
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
    const sql = `
      SELECT
        b.*,

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
    const result = await pool.query(
      `
      SELECT *
      FROM bookings
      WHERE id = $1
      `,
      [id],
    );

    return result.rows[0];
  }

  // GET BOOKINGS BY CUSTOMER
  static async getByCustomerId(
    customerId: number,
  ): Promise<BookingWithDetails[]> {
    const result = await pool.query(
      `
      SELECT *
      FROM bookings
      WHERE customer_id = $1
      ORDER BY created_at DESC
      `,
      [customerId],
    );

    return result.rows;
  }

  // GET BOOKINGS BY BARBER
  static async getByBarberId(barberId: number): Promise<BookingWithDetails[]> {
    const result = await pool.query(
      `
      SELECT *
      FROM bookings
      WHERE barber_id = $1
      ORDER BY created_at DESC
      `,
      [barberId],
    );

    return result.rows;
  }

  // UPDATE BOOKING
  static async update(
    id: number,
    data: UpdateBookingInput,
  ): Promise<Booking | undefined> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

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

      const updatedResult = await client.query(
        `
        UPDATE bookings
        SET
          status = COALESCE($1,status),
          updated_at = NOW()
        WHERE id = $2
        RETURNING *
        `,
        [data.status ?? null, id],
      );

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

      return updatedResult.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // DELETE BOOKING
  static async deleteById(id: number): Promise<Booking | undefined> {
    const result = await pool.query(
      `
      DELETE FROM bookings
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    return result.rows[0];
  }
}
