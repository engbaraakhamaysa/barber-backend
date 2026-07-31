import pool from "../../config/db";
import {
  BookingSlot,
  CreateBookingSlotInput,
  UpdateBookingSlotInput,
} from "./booking-slot.types";

export class BookingSlotRepository {
  // CREATE
  static async create(data: CreateBookingSlotInput): Promise<BookingSlot> {
    const sql = `
      INSERT INTO booking_slots (
        barber_id,
        slot_time
      )
      VALUES ($1,$2)
      RETURNING *
    `;

    const result = await pool.query(sql, [data.barber_id, data.slot_time]);

    return result.rows[0];
  }

  // GET ALL
  static async getAll(): Promise<BookingSlot[]> {
    const result = await pool.query(`
      SELECT *
      FROM booking_slots
      ORDER BY slot_time ASC
    `);

    return result.rows;
  }

  // GET BY ID
  static async getById(id: number): Promise<BookingSlot | undefined> {
    const result = await pool.query(
      `
      SELECT *
      FROM booking_slots
      WHERE id=$1
      `,
      [id],
    );

    return result.rows[0];
  }

  // GET BY BARBER
  static async getByBarberId(barberId: number): Promise<BookingSlot[]> {
    const result = await pool.query(
      `
      SELECT *
      FROM booking_slots
      WHERE barber_id=$1
      ORDER BY slot_time ASC
      `,
      [barberId],
    );

    return result.rows;
  }

  // UPDATE

  static async update(
    id: number,
    data: UpdateBookingSlotInput,
  ): Promise<BookingSlot | undefined> {
    const result = await pool.query(
      `
      UPDATE booking_slots
      SET
        slot_time = COALESCE($1,slot_time),
        updated_at = NOW()
      WHERE id=$2
      RETURNING *
      `,
      [data.slot_time ?? null, id],
    );

    return result.rows[0];
  }

  // DELETE

  static async deleteById(id: number): Promise<BookingSlot | undefined> {
    const result = await pool.query(
      `
      DELETE FROM booking_slots
      WHERE id=$1
      RETURNING *
      `,
      [id],
    );

    return result.rows[0];
  }
}
