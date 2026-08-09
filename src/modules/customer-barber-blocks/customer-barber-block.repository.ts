import pool from "../../config/db";
import {
  CustomerBarberBlock,
  CreateCustomerBarberBlockInput,
} from "./customer-barber-block.types";

export class CustomerBarberBlockRepository {
  ///////////////////////////////////////////
  // CREATE CUSTOMER-BARBER BLOCK
  // Create a new block between a customer and a barber
  // Stores the customer, barber, and optional blocking reason
  ///////////////////////////////////////////
  static async create(
    data: CreateCustomerBarberBlockInput,
  ): Promise<CustomerBarberBlock> {
    const sql = `
      INSERT INTO customer_barber_blocks (
        customer_id,
        barber_id,
        reason
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.customer_id,
      data.barber_id,
      data.reason ?? null,
    ]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // GET CUSTOMER-BARBER BLOCK BY ID
  // Return a specific customer-barber block by its ID
  ///////////////////////////////////////////
  static async getById(id: number): Promise<CustomerBarberBlock | undefined> {
    const sql = `
      SELECT *
      FROM customer_barber_blocks
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // GET ACTIVE BLOCKS BY BARBER
  // Return all active customer blocks for a specific barber
  // Results are ordered by the most recent block first
  ///////////////////////////////////////////
  static async getActiveByBarberId(
    barberId: number,
  ): Promise<CustomerBarberBlock[]> {
    const sql = `
      SELECT *
      FROM customer_barber_blocks
      WHERE barber_id = $1
        AND is_active = true
      ORDER BY blocked_at DESC
    `;

    const result = await pool.query(sql, [barberId]);

    return result.rows;
  }

  ///////////////////////////////////////////
  // GET ACTIVE BLOCKS BY CUSTOMER
  // Return all active barber blocks for a specific customer
  // Results are ordered by the most recent block first
  ///////////////////////////////////////////
  static async getActiveByCustomerId(
    customerId: number,
  ): Promise<CustomerBarberBlock[]> {
    const sql = `
      SELECT *
      FROM customer_barber_blocks
      WHERE customer_id = $1
        AND is_active = true
      ORDER BY blocked_at DESC
    `;

    const result = await pool.query(sql, [customerId]);

    return result.rows;
  }

  ///////////////////////////////////////////
  // CHECK ACTIVE CUSTOMER-BARBER BLOCK
  // Check whether a customer is currently blocked by a specific barber
  // Return the active block record when one exists
  ///////////////////////////////////////////
  static async getActiveBlock(
    customerId: number,
    barberId: number,
  ): Promise<CustomerBarberBlock | undefined> {
    const sql = `
      SELECT *
      FROM customer_barber_blocks
      WHERE customer_id = $1
        AND barber_id = $2
        AND is_active = true
      LIMIT 1
    `;

    const result = await pool.query(sql, [customerId, barberId]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // UNBLOCK CUSTOMER
  // Deactivate an active customer-barber block
  // Store the unblocked timestamp and update timestamp
  ///////////////////////////////////////////
  static async unblock(id: number): Promise<CustomerBarberBlock | undefined> {
    const sql = `
      UPDATE customer_barber_blocks
      SET
        is_active = false,
        unblocked_at = NOW(),
        updated_at = NOW()
      WHERE id = $1
        AND is_active = true
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // DELETE BLOCK RECORD
  // Permanently delete a customer-barber block record by ID
  ///////////////////////////////////////////
  static async deleteById(
    id: number,
  ): Promise<CustomerBarberBlock | undefined> {
    const sql = `
      DELETE FROM customer_barber_blocks
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }
}
