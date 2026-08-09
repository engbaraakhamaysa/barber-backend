import pool from "../../config/db";
import { Shop, CreateShopInput, UpdateShopInput } from "./shop.types";

export class ShopRepository {
  ///////////////////////////////////////////
  // CREATE SHOP
  // Insert new shop into database
  ///////////////////////////////////////////
  static async create(data: CreateShopInput): Promise<Shop> {
    const sql = `
      INSERT INTO shops (
        name,
        location
      )
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(sql, [data.name, data.location]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // GET ALL SHOPS
  // Return all shops from database
  ///////////////////////////////////////////
  static async getAll(): Promise<Shop[]> {
    const sql = `
      SELECT *
      FROM shops
      ORDER BY id DESC
    `;

    const result = await pool.query(sql);

    return result.rows;
  }

  ///////////////////////////////////////////
  // GET SHOP BY ID
  // Find shop using unique shop id
  ///////////////////////////////////////////
  static async getById(id: number): Promise<Shop | undefined> {
    const sql = `
      SELECT *
      FROM shops
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // UPDATE SHOP
  // Update provided fields only
  // Uses COALESCE for partial updates
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateShopInput,
  ): Promise<Shop | undefined> {
    const sql = `
      UPDATE shops
      SET
        name = COALESCE($1, name),
        location = COALESCE($2, location),
        is_active = COALESCE($3, is_active),
        updated_at = NOW()
      WHERE id = $4
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.name ?? null,
      data.location ?? null,
      data.is_active ?? null,
      id,
    ]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // DELETE SHOP
  // Remove shop permanently from database
  ///////////////////////////////////////////
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
