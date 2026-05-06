import pool from "../db";

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
  static async create(name: string, location: string) {
    const sql = `
      INSERT INTO shops (name, location)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(sql, [name, location]);
    return result.rows[0];
  }

  static async getAll() {
    const sql = `
      SELECT * FROM shops
      ORDER BY id DESC
    `;

    const result = await pool.query(sql);
    return result.rows;
  }

  static async getById(id: number) {
    const sql = `
      SELECT * FROM shops
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
  }
}
