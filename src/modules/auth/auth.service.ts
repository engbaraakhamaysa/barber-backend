import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.repository";
import {
  AuthResponse,
  AuthUser,
  JwtPayload,
  LoginInput,
  RegisterInput,
} from "./auth.types";

export class AuthService {
  // REGISTER
  static async register(data: RegisterInput): Promise<AuthUser> {
    // Check if email already exists
    const existingUser = await AuthRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("EMAIL_ALREADY_REGISTERED");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    return AuthRepository.create(data, hashedPassword);
  }

  // LOGIN
  static async login(data: LoginInput): Promise<AuthResponse> {
    // Find user
    const user = await AuthRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    // Check account status
    if (user.status === "blocked") {
      throw new Error("USER_ACCOUNT_BLOCKED");
    }

    // Compare password
    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) {
      throw new Error("INVALID_CREDENTIALS");
    }

    // Create JWT payload
    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET_NOT_CONFIGURED");
    }

    // Generate access token
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "1d",
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

    if (user.status === "blocked") {
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
