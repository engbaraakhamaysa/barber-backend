import pool from "../../config/db";
import {
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
} from "./customer.types";

export class CustomerRepository {
  // CREATE CUSTOMER
  static async create(data: CreateCustomerInput): Promise<Customer> {
    const sql = `
      INSERT INTO customers (
        user_id,
        name,
        phone
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.user_id ?? null,
      data.name,
      data.phone ?? null,
    ]);

    return result.rows[0];
  }

  // GET ALL CUSTOMERS
  static async getAll(): Promise<Customer[]> {
    const sql = `
      SELECT *
      FROM customers
      ORDER BY id DESC
    `;

    const result = await pool.query(sql);

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

  // UPDATE CUSTOMER
  static async update(
    id: number,
    data: UpdateCustomerInput,
  ): Promise<Customer | undefined> {
    const sql = `
      UPDATE customers
      SET
        name = COALESCE($1, name),
        phone = COALESCE($2, phone),
        updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.name ?? null,
      data.phone ?? null,
      id,
    ]);

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
