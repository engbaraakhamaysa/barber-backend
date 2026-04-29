import pool from "../db";

export interface Booking {
  id: number;
  shop_id: number;
  chair_id: number;
  customer_id: number;
  start_time: Date;
  end_time: Date;
  status: "scheduled" | "cancelled" | "done";
  created_at: Date;
}

export class BookingModel {
  // CREATE
  static async create(
    shop_id: number,
    chair_id: number,
    customer_id: number,
    start_time: string,
    end_time: string,
  ): Promise<Booking> {
    const sql = `
      INSERT INTO bookings
      (shop_id, chair_id, customer_id, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      shop_id,
      chair_id,
      customer_id,
      start_time,
      end_time,
    ]);

    return result.rows[0];
  }

  // GET ALL
  static async getAll(): Promise<Booking[]> {
    const sql = `SELECT * FROM bookings ORDER BY start_time ASC`;
    const result = await pool.query(sql);
    return result.rows;
  }

  // GET BY ID
  static async getById(id: number): Promise<Booking | undefined> {
    const sql = `SELECT * FROM bookings WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }

  // UPDATE STATUS
  static async updateStatus(
    id: number,
    status: "scheduled" | "cancelled" | "done",
  ): Promise<Booking | undefined> {
    const sql = `
      UPDATE bookings
      SET status = $1
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(sql, [status, id]);
    return result.rows[0];
  }

  // DELETE
  static async delete(id: number): Promise<Booking | undefined> {
    const sql = `
      DELETE FROM bookings
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }
}
