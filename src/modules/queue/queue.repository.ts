import pool from "../../config/db";
import { QueueEntry, JoinQueueInput, UpdateQueueInput } from "./queue.types";

export class QueueRepository {
  // JOIN QUEUE
  static async joinQueue(data: JoinQueueInput): Promise<QueueEntry> {
    const sql = `
      INSERT INTO queue_entries (
        customer_id,
        shop_id,
        barber_id,
        booking_id,
        queue_number,
        status
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        (
          SELECT COALESCE(MAX(queue_number), 0) + 1
          FROM queue_entries
          WHERE shop_id = $2
            AND DATE(joined_at) = CURRENT_DATE
        ),
        'waiting'
      )
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.customer_id,
      data.shop_id,
      data.barber_id ?? null,
      data.booking_id ?? null,
    ]);

    return result.rows[0];
  }

  // GET ALL QUEUE ENTRIES
  static async getAll(): Promise<QueueEntry[]> {
    const sql = `
      SELECT *
      FROM queue_entries
      ORDER BY joined_at ASC
    `;

    const result = await pool.query(sql);

    return result.rows;
  }

  // GET QUEUE BY ID
  static async getById(id: number): Promise<QueueEntry | undefined> {
    const sql = `
      SELECT *
      FROM queue_entries
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // GET QUEUE BY SHOP
  static async getByShopId(shopId: number): Promise<QueueEntry[]> {
    const sql = `
      SELECT *
      FROM queue_entries
      WHERE shop_id = $1
        AND DATE(joined_at) = CURRENT_DATE
        AND status IN ('waiting', 'in_service')
      ORDER BY queue_number ASC
    `;

    const result = await pool.query(sql, [shopId]);

    return result.rows;
  }

  // GET CUSTOMER QUEUE ENTRY
  static async getActiveByCustomerId(
    customerId: number,
    shopId: number,
  ): Promise<QueueEntry | undefined> {
    const sql = `
      SELECT *
      FROM queue_entries
      WHERE customer_id = $1
        AND shop_id = $2
        AND DATE(joined_at) = CURRENT_DATE
        AND status IN ('waiting', 'in_service')
      ORDER BY joined_at DESC
      LIMIT 1
    `;

    const result = await pool.query(sql, [customerId, shopId]);

    return result.rows[0];
  }

  // GET NEXT CUSTOMER
  static async getNextWaiting(shopId: number): Promise<QueueEntry | undefined> {
    const sql = `
      SELECT *
      FROM queue_entries
      WHERE shop_id = $1
        AND DATE(joined_at) = CURRENT_DATE
        AND status = 'waiting'
      ORDER BY queue_number ASC
      LIMIT 1
    `;

    const result = await pool.query(sql, [shopId]);

    return result.rows[0];
  }

  // UPDATE QUEUE ENTRY
  static async update(
    id: number,
    data: UpdateQueueInput,
  ): Promise<QueueEntry | undefined> {
    const sql = `
      UPDATE queue_entries
      SET
        status = COALESCE($1, status),
        barber_id = COALESCE($2, barber_id),
        updated_at = NOW(),

        started_at = CASE
          WHEN $1 = 'in_service'
            AND started_at IS NULL
          THEN NOW()
          ELSE started_at
        END,

        completed_at = CASE
          WHEN $1 = 'completed'
          THEN NOW()
          ELSE completed_at
        END

      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.status ?? null,
      data.barber_id ?? null,
      id,
    ]);

    return result.rows[0];
  }

  // DELETE QUEUE ENTRY
  static async deleteById(id: number): Promise<QueueEntry | undefined> {
    const sql = `
      DELETE FROM queue_entries
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }
}
