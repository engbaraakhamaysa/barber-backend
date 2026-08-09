import pool from "../../config/db";
import {
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
} from "./customer.types";

export class CustomerRepository {
  ///////////////////////////////////////////
  // CREATE CUSTOMER
  // Insert a new customer into the database
  // Supports optional user account and phone number
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET ALL CUSTOMERS
  // Return all customers from the database
  // Results are ordered by newest customer first
  ///////////////////////////////////////////
  static async getAll(): Promise<Customer[]> {
    const sql = `
      SELECT *
      FROM customers
      ORDER BY id DESC
    `;

    const result = await pool.query(sql);

    return result.rows;
  }

  ///////////////////////////////////////////
  // GET CUSTOMER BY ID
  // Find a customer using their unique ID
  // Return undefined when the customer does not exist
  ///////////////////////////////////////////
  static async getById(id: number): Promise<Customer | undefined> {
    const sql = `
      SELECT *
      FROM customers
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // UPDATE CUSTOMER
  // Update provided customer fields only
  // Uses COALESCE to preserve unchanged values
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // DELETE CUSTOMER
  // Permanently remove a customer from database
  // Return the deleted customer when successful
  ///////////////////////////////////////////
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
