import pool from "../../config/db";
import { QueueEntry, JoinQueueInput, UpdateQueueInput } from "./queue.types";

export class QueueRepository {
  ///////////////////////////////////////////
  // JOIN QUEUE
  // Add customer to barber queue
  // Set initial queue status to waiting
  ///////////////////////////////////////////
  static async joinQueue(data: JoinQueueInput): Promise<QueueEntry> {
    const sql = `
      INSERT INTO queue_entries (
        barber_id,
        customer_id,
        status
      )
      VALUES (
        $1,
        $2,
        'waiting'
      )
      RETURNING *
    `;

    const result = await pool.query(sql, [data.barber_id, data.customer_id]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // GET ALL QUEUE
  // Return all queue entries
  // Order entries by join time
  ///////////////////////////////////////////
  static async getAll(): Promise<QueueEntry[]> {
    const sql = `
      SELECT *
      FROM queue_entries
      ORDER BY joined_at ASC
    `;

    const result = await pool.query(sql);

    return result.rows;
  }

  ///////////////////////////////////////////
  // GET QUEUE BY ID
  // Find queue entry using unique queue id
  ///////////////////////////////////////////
  static async getById(id: number): Promise<QueueEntry | undefined> {
    const sql = `
      SELECT *
      FROM queue_entries
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // GET QUEUE BY BARBER
  // Return active queue entries for a barber
  // Include customer name
  // Include waiting, called, and in-service customers
  ///////////////////////////////////////////
  static async getByBarberId(barberId: number): Promise<QueueEntry[]> {
    const sql = `
    SELECT
      queue_entries.*,
      customers.name AS customer_name
    FROM queue_entries
    JOIN customers
      ON customers.id = queue_entries.customer_id
    WHERE queue_entries.barber_id = $1
    AND queue_entries.status IN (
      'waiting',
      'called',
      'in_service'
    )
    ORDER BY queue_entries.joined_at ASC
  `;

    const result = await pool.query(sql, [barberId]);

    return result.rows;
  }

  ///////////////////////////////////////////
  // GET ACTIVE CUSTOMER QUEUE
  // Find customer's current active queue entry
  // Return the latest active queue entry
  ///////////////////////////////////////////
  static async getActiveByCustomerId(
    customerId: number,
  ): Promise<QueueEntry | undefined> {
    const sql = `
      SELECT *
      FROM queue_entries
      WHERE customer_id = $1
      AND status IN (
        'waiting',
        'called',
        'in_service'
      )
      ORDER BY joined_at DESC
      LIMIT 1
    `;

    const result = await pool.query(sql, [customerId]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // GET NEXT CUSTOMER
  // Find the first waiting customer for a barber
  // Return the customer at the front of the queue
  ///////////////////////////////////////////
  static async getNextWaiting(
    barberId: number,
  ): Promise<QueueEntry | undefined> {
    const sql = `
      SELECT *
      FROM queue_entries
      WHERE barber_id = $1
      AND status = 'waiting'
      ORDER BY joined_at ASC
      LIMIT 1
    `;

    const result = await pool.query(sql, [barberId]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // UPDATE QUEUE
  // Update queue status or assigned barber
  // Set timestamps based on queue status changes
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateQueueInput,
  ): Promise<QueueEntry | undefined> {
    const sql = `
      UPDATE queue_entries
      SET
        status = COALESCE($1, status),

        barber_id = COALESCE(
          $2,
          barber_id
        ),

        called_at = CASE
          WHEN $1 = 'called'
          AND called_at IS NULL
          THEN NOW()
          ELSE called_at
        END,

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
        END,

        cancelled_at = CASE
          WHEN $1 = 'cancelled'
          THEN NOW()
          ELSE cancelled_at
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

  ///////////////////////////////////////////
  // DELETE QUEUE
  // Remove queue entry permanently from database
  ///////////////////////////////////////////
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
