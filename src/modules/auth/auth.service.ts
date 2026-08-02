import { AuthRepository } from "./auth.repository";
import {
  AuthResponse,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "./auth.types";

import { generateToken } from "../../utils/jwt";
import { hashPassword, comparePassword } from "../../utils/password";

export class AuthService {
  // REGISTER
  static async register(data: RegisterInput): Promise<AuthUser> {
    const existingUser = await AuthRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("EMAIL_ALREADY_REGISTERED");
    }

    const hashedPassword = await hashPassword(data.password);

    return AuthRepository.create(
      {
        ...data,
        role: "user",
      },
      hashedPassword,
    );
  }

  // LOGIN
  static async login(data: LoginInput): Promise<AuthResponse> {
    const user = await AuthRepository.findByEmail(data.email);

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

  // GET CURRENT USER
  static async getCurrentUser(id: number): Promise<AuthUser | undefined> {
    const user = await AuthRepository.findById(id);

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
