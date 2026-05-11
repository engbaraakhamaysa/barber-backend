import pool from "../db";

import { Barber } from "../types/barber.types";

export class BarberModel {
  /////////////////////////////////////////////////////////
  //                  CREATE NEW Barber                  //
  /////////////////////////////////////////////////////////

  static async create(
    shop_id: number,
    name: string,
    email: string,
    password: string,
  ): Promise<Barber> {
    const sql = `
        INSERT INTO barbers (shop_id, name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *
  `;

    try {
      const result = await pool.query(sql, [shop_id, name, email, password]);
      return result.rows[0];
    } catch (error) {
      console.log("Error create barber DB", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //                  GET By Shop_Id Barber              //
  /////////////////////////////////////////////////////////

  static async getByShopId(shop_id: number): Promise<Barber[]> {
    const sql = `
            SELECT * FROM barbers
            WHERE shop_id = $1
            ORDER BY id DESC
        `;

    try {
      const result = await pool.query(sql, [shop_id]);
      return result.rows;
    } catch (error) {
      console.error("Error get by shop_id", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //                 UPDATE Barber                       //
  /////////////////////////////////////////////////////////

  static async update(
    id: number,
    name: string,
    email: string,
    password: string,
    is_active: boolean,
  ): Promise<Barber> {
    const sql = `
        UPDATE barbers
        SET name = $1, email = $2, password=$3, is_active = $4
        WHERE id = $5
        RETURNING *
      `;

    try {
      const result = await pool.query(sql, [
        name,
        email,
        password,
        is_active,
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error Update", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //                 DELETE Barber                       //
  /////////////////////////////////////////////////////////

  static async deleteById(id: number): Promise<Barber> {
    const sql = `
            DELETE FROM barbers
            WHERE id = $1
            RETURNING *
        `;

    try {
      const result = await pool.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting barber", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //                    LOGIN BARBER                     //
  /////////////////////////////////////////////////////////

  static async login(email: string, password: string): Promise<Barber | null> {
    const sql = `
    SELECT * FROM barbers
    WHERE email = $1 AND password = $2
    LIMIT 1
  `;

    try {
      const result = await pool.query(sql, [email, password]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error login barber", error);
      throw error;
    }
  }
}
