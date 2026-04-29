import pool from "../db";

export interface QueueEntry {
  id: number;
  shop_id: number;
  chair_id: number;
  customer_id: number;
  position: number;
  status: "waiting" | "done" | "cancelled";
  created_at: Date;
  updated_at: Date;
}

export class QueueModel {
  // CREATE
  static async create(
    shop_id: number,
    chair_id: number,
    customer_id: number,
    position: number,
  ): Promise<QueueEntry> {
    const sql = `
      INSERT INTO queue_entries
      (shop_id, chair_id, customer_id, position)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      shop_id,
      chair_id,
      customer_id,
      position,
    ]);

    return result.rows[0];
  }

  // GET ALL
  static async getAll(): Promise<QueueEntry[]> {
    const sql = `SELECT * FROM queue_entries ORDER BY position ASC`;
    const result = await pool.query(sql);
    return result.rows;
  }

  // GET BY ID
  static async getById(id: number): Promise<QueueEntry | undefined> {
    const sql = `SELECT * FROM queue_entries WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }

  // UPDATE STATUS
  static async updateStatus(
    id: number,
    status: "waiting" | "done" | "cancelled",
  ): Promise<QueueEntry | undefined> {
    const sql = `
      UPDATE queue_entries
      SET status = $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(sql, [status, id]);
    return result.rows[0];
  }

  // DELETE
  static async delete(id: number): Promise<QueueEntry | undefined> {
    const sql = `
      DELETE FROM queue_entries
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }
}
