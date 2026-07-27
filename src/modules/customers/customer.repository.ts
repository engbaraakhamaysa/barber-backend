import pool from "../../config/db";
import { Customer } from "./customer.types";

export class CustomerRepository {
  // CREATE CUSTOMER
  static async create(
    barberId: number,
    name: string,
    phone: string,
  ): Promise<Customer> {
    const sql = `
      INSERT INTO customers (
        barber_id,
        name,
        phone
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(sql, [barberId, name, phone]);

    return result.rows[0];
  }

  // GET CUSTOMERS BY BARBER ID
  static async getByBarberId(barberId: number): Promise<Customer[]> {
    const sql = `
      SELECT *
      FROM customers
      WHERE barber_id = $1
      ORDER BY created_at ASC
    `;

    const result = await pool.query(sql, [barberId]);

    return result.rows;
  }

  // GET CUSTOMER BY ID
  static async getById(id: number): Promise<Customer | undefined> {
    const sql = `
      SELECT *
      FROM customers
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // DELETE CUSTOMER
  static async deleteById(id: number): Promise<Customer | undefined> {
    const sql = `
      DELETE FROM customers
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }
}
