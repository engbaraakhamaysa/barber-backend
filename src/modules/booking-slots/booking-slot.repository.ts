import pool from "../../config/db";
import { BookingSlot, BookSlotInput } from "./booking-slot.types";

export class BookingSlotRepository {
  // CREATE BOOKING SLOTS
  static async createSlots(barberId: number, slots: string[]): Promise<void> {
    const queries = slots.map((slot) => {
      const now = new Date();

      const [hours, minutes] = slot.split(":").map(Number);

      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes,
        0,
      );

      return pool.query(
        `
          INSERT INTO booking_slots (
            barber_id,
            slot_time
          )
          VALUES ($1, $2)
        `,
        [barberId, date],
      );
    });

    await Promise.all(queries);
  }

  // GET ALL SLOTS BY BARBER ID
  static async getAllByBarber(barberId: number): Promise<BookingSlot[]> {
    const sql = `
      SELECT *
      FROM booking_slots
      WHERE barber_id = $1
      ORDER BY slot_time ASC
    `;

    const result = await pool.query(sql, [barberId]);

    return result.rows;
  }

  // GET SLOT BY ID
  static async getById(id: number): Promise<BookingSlot | undefined> {
    const sql = `
      SELECT *
      FROM booking_slots
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // DELETE SLOT
  static async deleteById(id: number): Promise<BookingSlot | undefined> {
    const sql = `
      DELETE FROM booking_slots
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // BOOK SLOT
  static async bookSlot(data: BookSlotInput): Promise<BookingSlot | undefined> {
    const sql = `
      UPDATE booking_slots
      SET
        is_booked = true,
        customer_name = $1,
        customer_phone = $2
      WHERE id = $3
        AND is_booked = false
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.customer_name,
      data.customer_phone ?? null,
      data.slot_id,
    ]);

    return result.rows[0];
  }
}
