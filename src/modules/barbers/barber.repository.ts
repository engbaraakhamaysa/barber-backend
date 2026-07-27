import pool from "../../config/db";
import { Barber } from "./barber.types";

export class BarberRepository {
  // CREATE BARBER
  static async create(
    shopId: number,
    name: string,
    email: string,
    password: string,
  ): Promise<Barber> {
    const sql = `
      INSERT INTO barbers (
        shop_id,
        name,
        email,
        password
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(sql, [shopId, name, email, password]);

    return result.rows[0];
  }

  // GET BARBERS BY SHOP ID
  static async getByShopId(shopId: number): Promise<Barber[]> {
    const sql = `
      SELECT *
      FROM barbers
      WHERE shop_id = $1
      ORDER BY id DESC
    `;

    const result = await pool.query(sql, [shopId]);

    return result.rows;
  }

  // GET BARBER BY ID
  static async getById(id: number): Promise<Barber | undefined> {
    const sql = `
      SELECT *
      FROM barbers
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // UPDATE BARBER
  static async update(
    id: number,
    name: string,
    email: string,
    password: string,
    isActive: boolean,
  ): Promise<Barber | undefined> {
    const sql = `
      UPDATE barbers
      SET
        name = $1,
        email = $2,
        password = $3,
        is_active = $4
      WHERE id = $5
      RETURNING *
    `;

    const result = await pool.query(sql, [name, email, password, isActive, id]);

    return result.rows[0];
  }

  // DELETE BARBER
  static async deleteById(id: number): Promise<Barber | undefined> {
    const sql = `
      DELETE FROM barbers
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // GET BARBER BY EMAIL
  static async getByEmail(email: string): Promise<Barber | undefined> {
    const sql = `
      SELECT *
      FROM barbers
      WHERE email = $1
      LIMIT 1
    `;

    const result = await pool.query(sql, [email]);

    return result.rows[0];
  }
}
