import pool from "../db";

export class CustomerModel {
  /////////////////////////////////////////////////////////
  //                 CREATE CUSTOMER                     //
  /////////////////////////////////////////////////////////

  static async create(barber_id: number, name: string, phone: string) {
    const sql = `
      INSERT INTO customers (barber_id, name, phone)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    try {
      const result = await pool.query(sql, [barber_id, name, phone]);
      return result.rows[0];
    } catch (error) {
      console.error("Error create customer", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //            GET CUSTOMERS BY BARBER ID              //
  /////////////////////////////////////////////////////////

  static async getByBarberId(barber_id: number) {
    const sql = `
      SELECT * FROM customers
      WHERE barber_id = $1
      ORDER BY created_at ASC
    `;

    try {
      const result = await pool.query(sql, [barber_id]);
      return result.rows;
    } catch (error) {
      console.error("Error GET customers by barber id", error);
      throw error;
    }
  }

  /////////////////////////////////////////////////////////
  //              DELETE CUSTOMER BY ID                 //
  /////////////////////////////////////////////////////////

  static async deleteById(id: number) {
    const sql = `
      DELETE FROM customers
      WHERE id = $1
      RETURNING *
    `;

    try {
      const result = await pool.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error delete customer", error);
      throw error;
    }
  }
}
