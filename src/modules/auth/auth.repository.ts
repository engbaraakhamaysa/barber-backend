import pool from "../../config/db";
import { AuthUser, CreateUserInput } from "./auth.types";

interface UserRecord extends AuthUser {
  password: string;
  is_active: boolean;
}

export class AuthRepository {
  // GET USER BY EMAIL
  static async findByEmail(email: string): Promise<UserRecord | undefined> {
    const sql = `
      SELECT
        id,
        name,
        email,
        password,
        role,
        is_active
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

    const result = await pool.query(sql, [email]);

    return result.rows[0];
  }

  // GET USER BY ID
  static async findById(id: number): Promise<UserRecord | undefined> {
    const sql = `
      SELECT
        id,
        name,
        email,
        password,
        role,
        is_active
      FROM users
      WHERE id = $1
      LIMIT 1
    `;

    const result = await pool.query(sql, [id]);

    return result.rows[0];
  }

  // CREATE USER
  static async create(
    data: CreateUserInput,
    hashedPassword: string,
  ): Promise<AuthUser> {
    const sql = `
      INSERT INTO users (
        name,
        email,
        password,
        role
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        name,
        email,
        role
    `;

    const result = await pool.query(sql, [
      data.name,
      data.email,
      hashedPassword,
      data.role,
    ]);

    return result.rows[0];
  }
}
