import pool from "../db";

import { Shop } from "../types/shop.types";

// Why static methods?
// ✔ We don't need to create an instance using `new ShopModel()`
// ✔ We can call methods directly like: ShopModel.getAll()
// ✔ Cleaner and simpler inside controllers
// ✔ Common pattern in Node.js backend architectures (clean architecture)
// ✔ Reduces unnecessary object creation (better for simple data access layers)
//
// 📌 Example:
// const shops = await ShopModel.getAll();
// const shop = await ShopModel.getById(1);

export class ShopModel {
  /////////////////////////////////////////////////////////
  //                  CREATE NEW SHOP                    //
  /////////////////////////////////////////////////////////

  static async create(name: string, location: string): Promise<Shop> {
    const sql = `
      INSERT INTO shops (name, location)
      VALUES ($1, $2)
      RETURNING *
    `;

    try {
      const result = await pool.query(sql, [name, location]);
      return result.rows[0];
    } catch (error) {
      console.error("Error create shop:", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //                  GET All Shops                      //
  /////////////////////////////////////////////////////////

  static async getAll(): Promise<Shop[]> {
    const sql = `
      SELECT * FROM shops
      ORDER BY id DESC
    `;

    try {
      const result = await pool.query(sql);
      return result.rows;
    } catch (error) {
      console.error("Error getAll shops:", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //                  GET Shop By ID                     //
  /////////////////////////////////////////////////////////

  static async getById(id: number): Promise<Shop | undefined> {
    const sql = `
      SELECT * FROM shops
      WHERE id = $1
    `;

    try {
      const result = await pool.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error getById shop:", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //                  DELETE Shop By ID                  //
  /////////////////////////////////////////////////////////

  static async deleteById(id: number): Promise<Shop | undefined> {
    const sql = `
      DELETE FROM shops
      WHERE id = $1
      RETURNING *
    `;

    try {
      const result = await pool.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting shop:", error);
      throw error;
    }
  }
}
