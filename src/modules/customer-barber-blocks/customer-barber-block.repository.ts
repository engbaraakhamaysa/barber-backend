import pool from "../../config/db";
import {
  CustomerBarberBlock,
  CreateCustomerBarberBlockInput,
} from "./customer-barber-block.types";

export class CustomerBarberBlockRepository {
  // CREATE BLOCK
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

  // GET BLOCK BY ID
  static async getById(id: number): Promise<CustomerBarberBlock | undefined> {
    const sql = `
      SELECT *
      FROM customer_barber_blocks
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // GET ACTIVE BLOCKS BY BARBER
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

  // GET ACTIVE BLOCKS BY CUSTOMER
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

  // CHECK ACTIVE BLOCK
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

  // UNBLOCK CUSTOMER
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

  // DELETE BLOCK RECORD
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
