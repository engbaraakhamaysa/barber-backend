import pool from "../../config/db";
import {
  Barber,
  BarberWithUser,
  CreateBarberInput,
  UpdateBarberInput,
} from "./barber.types";

export class BarberRepository {
  ///////////////////////////////////////////
  // CREATE BARBER
  // Create user and barber inside a transaction
  // Return barber with user information
  ///////////////////////////////////////////
  static async create(data: CreateBarberInput): Promise<BarberWithUser> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // 1. Create user with barber role
      const userResult = await client.query(
        `
          INSERT INTO users (
            name,
            email,
            password,
            role
          )
          VALUES ($1, $2, $3, 'barber')
          RETURNING id
        `,
        [data.name, data.email, data.password],
      );

      const userId = userResult.rows[0].id;

      // 2. Create barber linked to user and shop
      const barberResult = await client.query(
        `
          INSERT INTO barbers (
            user_id,
            shop_id
          )
          VALUES ($1, $2)
          RETURNING id
        `,
        [userId, data.shop_id],
      );

      await client.query("COMMIT");

      // 3. Return barber with user information
      const barber = await this.getById(barberResult.rows[0].id);

      if (!barber) {
        throw new Error("Barber was created but could not be retrieved");
      }

      return barber;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  ///////////////////////////////////////////
  // GET BARBER BY ID
  // Find barber using unique barber id
  // Return barber with user information
  ///////////////////////////////////////////
  static async getById(id: number): Promise<BarberWithUser | undefined> {
    const sql = `
      SELECT
        b.id,
        b.user_id,
        b.shop_id,
        b.is_active,
        b.created_at,
        b.updated_at,
        u.name,
        u.email,
        u.role
      FROM barbers b
      INNER JOIN users u
        ON b.user_id = u.id
      WHERE b.id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  ///////////////////////////////////////////
  // GET BARBERS BY SHOP
  // Return all barbers assigned to a shop
  // Include linked user information
  ///////////////////////////////////////////
  static async getByShopId(shopId: number): Promise<BarberWithUser[]> {
    const sql = `
      SELECT
        b.id,
        b.user_id,
        b.shop_id,
        b.is_active,
        b.created_at,
        b.updated_at,
        u.name,
        u.email,
        u.role
      FROM barbers b
      INNER JOIN users u
        ON b.user_id = u.id
      WHERE b.shop_id = $1
      ORDER BY b.id DESC
    `;

    const result = await pool.query(sql, [shopId]);

    return result.rows;
  }

  ///////////////////////////////////////////
  // UPDATE BARBER
  // Update barber and linked user information
  // Use transaction for related database updates
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateBarberInput,
  ): Promise<BarberWithUser | undefined> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Get linked user id
      const barberResult = await client.query(
        `
          SELECT user_id
          FROM barbers
          WHERE id = $1
        `,
        [id],
      );

      if (barberResult.rows.length === 0) {
        await client.query("ROLLBACK");

        return undefined;
      }

      const userId = barberResult.rows[0].user_id;

      // Update user information
      await client.query(
        `
          UPDATE users
          SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            updated_at = NOW()
          WHERE id = $4
        `,
        [data.name ?? null, data.email ?? null, data.password ?? null, userId],
      );

      // Update barber information
      await client.query(
        `
          UPDATE barbers
          SET
            is_active = COALESCE($1, is_active),
            updated_at = NOW()
          WHERE id = $2
        `,
        [data.is_active ?? null, id],
      );

      await client.query("COMMIT");

      return this.getById(id);
    } catch (error) {
      await client.query("ROLLBACK");

      throw error;
    } finally {
      client.release();
    }
  }

  ///////////////////////////////////////////
  // DELETE BARBER
  // Delete barber and linked user
  // Use transaction to keep related data consistent
  ///////////////////////////////////////////
  static async deleteById(id: number): Promise<Barber | undefined> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Get linked user id
      const barberResult = await client.query(
        `
          SELECT user_id
          FROM barbers
          WHERE id = $1
        `,
        [id],
      );

      if (barberResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return undefined;
      }

      const userId = barberResult.rows[0].user_id;

      // Delete barber
      const deletedBarber = await client.query(
        `
          DELETE FROM barbers
          WHERE id = $1
          RETURNING *
        `,
        [id],
      );

      // Delete linked user
      await client.query(
        `
          DELETE FROM users
          WHERE id = $1
        `,
        [userId],
      );

      await client.query("COMMIT");

      return deletedBarber.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
