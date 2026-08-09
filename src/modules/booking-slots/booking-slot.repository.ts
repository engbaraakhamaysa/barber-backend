import pool from "../../config/db";
import {
  BookingSlot,
  CreateBookingSlotInput,
  UpdateBookingSlotInput,
} from "./booking-slot.types";

export class BookingSlotRepository {
  ///////////////////////////////////////////
  // CREATE
  // Create a new booking slot
  // Associate the slot with a barber
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET ALL
  // Return all booking slots
  // Order slots by scheduled time
  ///////////////////////////////////////////
  static async getAll(): Promise<BookingSlot[]> {
    const result = await pool.query(`
      SELECT *
      FROM booking_slots
      ORDER BY slot_time ASC
    `);

    return result.rows;
  }

  ///////////////////////////////////////////
  // GET BY ID
  // Return a specific booking slot by ID
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET BY BARBER
  // Return all booking slots for a specific barber
  // Order slots by scheduled time
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // UPDATE
  // Update the scheduled time of a booking slot
  // Update the modification timestamp
  ///////////////////////////////////////////

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

  ///////////////////////////////////////////
  // DELETE
  // Permanently delete a booking slot by ID
  ///////////////////////////////////////////
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
