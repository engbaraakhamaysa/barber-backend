import pool from "../db";

export interface Chair {
  id: number;
  shop_id: number;
  name: string;
  type: "normal" | "vip";
  is_active: boolean;
}

export class ChairModel {
  // CREATE
  static async create(
    shop_id: number,
    name: string,
    type: "normal" | "vip" = "normal",
  ): Promise<Chair> {
    const sql = `
      INSERT INTO chairs (shop_id, name, type)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(sql, [shop_id, name, type]);
    return result.rows[0];
  }

  // GET ALL
  static async getAll(): Promise<Chair[]> {
    const sql = `SELECT * FROM chairs ORDER BY id ASC`;
    const result = await pool.query(sql);
    return result.rows;
  }

  // GET BY ID
  static async getById(id: number): Promise<Chair | undefined> {
    const sql = `SELECT * FROM chairs WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }

  // UPDATE
  static async update(
    id: number,
    name: string,
    type: "normal" | "vip",
    is_active: boolean,
  ): Promise<Chair | undefined> {
    const sql = `
      UPDATE chairs
      SET name = $1,
          type = $2,
          is_active = $3
      WHERE id = $4
      RETURNING *
    `;

    const result = await pool.query(sql, [name, type, is_active, id]);

    return result.rows[0];
  }

  // DELETE
  static async delete(id: number): Promise<Chair | undefined> {
    const sql = `
      DELETE FROM chairs
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }
}
