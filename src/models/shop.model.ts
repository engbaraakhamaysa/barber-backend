import pool from "../db";

export interface Shop {
  id: number;
  name: string;
  email: string;
  password: string;
  location: string;
  created_at: Date;
}

export class ShopModel {
  //CREATE NEW SHOP
  static async create(
    name: string,
    email: string,
    password: string,
    location: string,
  ): Promise<Shop> {
    const sql = `
      INSERT INTO shops (name, email, password, location)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    try {
      const result = await pool.query(sql, [name, email, password, location]);

      return result.rows[0];
    } catch (error) {
      console.error("Error creating shop:", error);
      throw error;
    }
  }

  //GET ALL SHOP ORDER BY ID
  static async getAll(): Promise<Shop[]> {
    const sql = `
    SELECT * FROM shops
    ORDER BY id ASC
  `;

    try {
      const result = await pool.query(sql);

      return result.rows;
    } catch (error) {
      console.error("Error getting shops:", error);
      throw error;
    }
  }

  //DET SHOP BY ID
  static async getById(id: number): Promise<Shop | undefined> {
    const sql = `
    SELECT * FROM shops
    WHERE id = $1
  `;

    try {
      const result = await pool.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      console.error("Error getting shop by id:", error);
      throw error;
    }
  }
  //UPDATE INFO Shop
  static async update(
    id: number,
    name: string,
    email: string,
    location: string,
  ): Promise<Shop | undefined> {
    const sql = `
    UPDATE shops
    SET name = $1,
        email = $2,
        location = $3
    WHERE id = $4
    RETURNING *
  `;

    try {
      const result = await pool.query(sql, [name, email, location, id]);

      return result.rows[0];
    } catch (error) {
      console.error("Error updating shop:", error);
      throw error;
    }
  }

  //DELETE SHOP
  static async delete(id: number): Promise<Shop> {
    const sql = `
                    DELETE FROM shops
                    WHERE id = $1
                    RETURNING *
    `;

    try {
      const result = await pool.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      console.log("Error deleting shop:", error);
      throw error;
    }
  }
}
