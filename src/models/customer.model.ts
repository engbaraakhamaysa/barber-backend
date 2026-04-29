import pool from "../db";

export interface Customer {
  id: number;
  name: string;
  phone: string;
  created_at: Date;
}

export class CustomerModel {
  // CREATE
  static async create(name: string, phone: string): Promise<Customer> {
    const sql = `
      INSERT INTO customers (name, phone)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(sql, [name, phone]);
    return result.rows[0];
  }

  // GET ALL
  static async getAll(): Promise<Customer[]> {
    const sql = `SELECT * FROM customers ORDER BY id ASC`;
    const result = await pool.query(sql);
    return result.rows;
  }

  // GET BY ID
  static async getById(id: number): Promise<Customer | undefined> {
    const sql = `SELECT * FROM customers WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }

  // UPDATE
  static async update(
    id: number,
    name: string,
    phone: string,
  ): Promise<Customer | undefined> {
    const sql = `
      UPDATE customers
      SET name = $1,
          phone = $2
      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(sql, [name, phone, id]);
    return result.rows[0];
  }

  // DELETE
  static async delete(id: number): Promise<Customer | undefined> {
    const sql = `
      DELETE FROM customers
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }
}
