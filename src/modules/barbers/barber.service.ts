import pool from "../../config/db";
import { UserRepository } from "../users/user.repository";
import { BarberRepository } from "./barber.repository";
import {
  BarberWithUser,
  CreateBarberInput,
  UpdateBarberInput,
} from "./barber.types";
import { hashPassword } from "../../utils/password";

export class BarberService {
  // CREATE BARBER
  static async create(data: CreateBarberInput): Promise<BarberWithUser> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // 1. Hash password
      const hashedPassword = await hashPassword(data.password);

      // 2. Create user with barber role
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
        [data.name, data.email, hashedPassword],
      );

      const userId = userResult.rows[0].id;

      // 3. Create barber linked to user and shop
      const barberResult = await client.query(
        `
          INSERT INTO barbers (
            user_id,
            shop_id
          )
          VALUES ($1, $2)
          RETURNING *
        `,
        [userId, data.shop_id],
      );

      await client.query("COMMIT");

      // 4. Get barber with user information
      const barber = await BarberRepository.getById(barberResult.rows[0].id);

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

  // GET BARBER BY ID
  static async getById(id: number): Promise<BarberWithUser | undefined> {
    return BarberRepository.getById(id);
  }

  // GET BARBERS BY SHOP ID
  static async getByShopId(shopId: number): Promise<BarberWithUser[]> {
    return BarberRepository.getByShopId(shopId);
  }

  // UPDATE BARBER
  static async update(
    id: number,
    data: UpdateBarberInput,
  ): Promise<BarberWithUser | undefined> {
    const updateData = {
      ...data,
      ...(data.password
        ? {
            password: await hashPassword(data.password),
          }
        : {}),
    };

    return BarberRepository.update(id, updateData);
  }

  // DELETE BARBER
  static async deleteById(id: number) {
    return BarberRepository.deleteById(id);
  }
}
