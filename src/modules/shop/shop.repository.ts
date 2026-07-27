import pool from "../../config/db";
import { Shop } from "./shop.types";

export class ShopRepository {
  static async create(name: string, location: string): Promise<Shop> {
    const sql = `
      INSERT INTO shops (name, location)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(sql, [name, location]);

    return result.rows[0];
  }

  static async getAll(): Promise<Shop[]> {
    const sql = `
      SELECT *
      FROM shops
      ORDER BY id DESC
    `;

    const result = await pool.query(sql);

    return result.rows;
  }

  static async getById(id: number): Promise<Shop | undefined> {
    const sql = `
      SELECT *
      FROM shops
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  static async deleteById(id: number): Promise<Shop | undefined> {
    const sql = `
      DELETE FROM shops
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }
}
