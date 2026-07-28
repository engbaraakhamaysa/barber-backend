import pool from "../../config/db";
import {
  BookingSlot,
  CreateBookingSlotInput,
  UpdateBookingSlotInput,
} from "./booking-slot.types";

export class BookingSlotRepository {
  // CREATE BOOKING SLOT
  static async create(data: CreateBookingSlotInput): Promise<BookingSlot> {
    const sql = `
      INSERT INTO booking_slots (
        shop_id,
        barber_id,
        start_time,
        end_time
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.shop_id,
      data.barber_id,
      data.start_time,
      data.end_time,
    ]);

    return result.rows[0];
  }

  // GET ALL BOOKING SLOTS
  static async getAll(): Promise<BookingSlot[]> {
    const sql = `
      SELECT *
      FROM booking_slots
      ORDER BY start_time ASC
    `;

    const result = await pool.query(sql);

    return result.rows;
  }

  // GET BOOKING SLOT BY ID
  static async getById(id: number): Promise<BookingSlot | undefined> {
    const sql = `
      SELECT *
      FROM booking_slots
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // GET AVAILABLE SLOTS BY SHOP
  static async getAvailableByShopId(shopId: number): Promise<BookingSlot[]> {
    const sql = `
      SELECT *
      FROM booking_slots
      WHERE shop_id = $1
        AND is_available = true
        AND start_time > NOW()
      ORDER BY start_time ASC
    `;

    const result = await pool.query(sql, [shopId]);

    return result.rows;
  }

  // GET AVAILABLE SLOTS BY BARBER
  static async getAvailableByBarberId(
    barberId: number,
  ): Promise<BookingSlot[]> {
    const sql = `
      SELECT *
      FROM booking_slots
      WHERE barber_id = $1
        AND is_available = true
        AND start_time > NOW()
      ORDER BY start_time ASC
    `;

    const result = await pool.query(sql, [barberId]);

    return result.rows;
  }

  // UPDATE BOOKING SLOT
  static async update(
    id: number,
    data: UpdateBookingSlotInput,
  ): Promise<BookingSlot | undefined> {
    const sql = `
      UPDATE booking_slots
      SET
        start_time = COALESCE($1, start_time),
        end_time = COALESCE($2, end_time),
        is_available = COALESCE($3, is_available),
        updated_at = NOW()
      WHERE id = $4
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.start_time ?? null,
      data.end_time ?? null,
      data.is_available ?? null,
      id,
    ]);

    return result.rows[0];
  }

  // DELETE BOOKING SLOT
  static async deleteById(id: number): Promise<BookingSlot | undefined> {
    const sql = `
      DELETE FROM booking_slots
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }
}
