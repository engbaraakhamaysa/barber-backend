import pool from "../../config/db";
import { User, CreateUserInput, UpdateUserInput } from "./user.types";

export class UserRepository {
  // CREATE USER
  static async create(data: CreateUserInput): Promise<User> {
    const sql = `
      INSERT INTO users (
        name,
        email,
        password,
        role
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.name,
      data.email,
      data.password,
      data.role,
    ]);

    return result.rows[0];
  }

  // GET USER BY ID
  static async getById(id: number): Promise<User | undefined> {
    const sql = `
      SELECT *
      FROM users
      WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // GET USER BY EMAIL
  static async getByEmail(email: string): Promise<User | undefined> {
    const sql = `
      SELECT *
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

    const result = await pool.query(sql, [email]);

    return result.rows[0];
  }

  // UPDATE USER
  static async update(
    id: number,
    data: UpdateUserInput,
  ): Promise<User | undefined> {
    const sql = `
      UPDATE users
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        is_active = COALESCE($4, is_active),
        updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `;

    const result = await pool.query(sql, [
      data.name ?? null,
      data.email ?? null,
      data.password ?? null,
      data.is_active ?? null,
      id,
    ]);

    return result.rows[0];
  }

  // DELETE USER
  static async deleteById(id: number): Promise<User | undefined> {
    const sql = `
      DELETE FROM users
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }
}
