import { UserRepository } from "../users/user.repository";

import {
  AuthResponse,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "./auth.types";

import { generateToken } from "../../utils/jwt";
import { hashPassword, comparePassword } from "../../utils/password";

export class AuthService {
  ///////////////////////////////////////////
  // REGISTER
  // Create new user account
  // Hash password before saving
  ///////////////////////////////////////////
  static async register(data: RegisterInput): Promise<AuthUser> {
    const existingUser = await UserRepository.getByEmail(data.email);

    if (existingUser) {
      throw new Error("EMAIL_ALREADY_REGISTERED");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await UserRepository.create({
      ...data,
      password: hashedPassword,
      role: "user",
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  ///////////////////////////////////////////
  // LOGIN
  // Verify user credentials
  // Generate access token after success
  ///////////////////////////////////////////
  static async login(data: LoginInput): Promise<AuthResponse> {
    const user = await UserRepository.getByEmail(data.email);

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    if (!user.is_active) {
      throw new Error("USER_ACCOUNT_BLOCKED");
    }

    const passwordMatches = await comparePassword(data.password, user.password);

    if (!passwordMatches) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const accessToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    };
  }

  ///////////////////////////////////////////
  // GET CURRENT USER
  // Return authenticated user information
  ///////////////////////////////////////////
  static async getCurrentUser(id: number): Promise<AuthUser | undefined> {
    const user = await UserRepository.getById(id);

    if (!user) {
      return undefined;
    }

    if (!user.is_active) {
      throw new Error("USER_ACCOUNT_BLOCKED");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
