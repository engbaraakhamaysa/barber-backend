import { UserRepository } from "./user.repository";
import {
  User,
  UserResponse,
  CreateUserInput,
  UpdateUserInput,
} from "./user.types";
import { hashPassword } from "../../utils/password";

export class UserService {
  ///////////////////////////////////////////
  // CREATE USER
  // Hash password before saving user
  // Return safe response without password
  ///////////////////////////////////////////
  static async create(data: CreateUserInput): Promise<UserResponse> {
    const hashedPassword = await hashPassword(data.password);

    const user = await UserRepository.create({
      ...data,
      password: hashedPassword,
    });

    return this.toResponse(user);
  }

  ///////////////////////////////////////////
  // GET USER BY ID
  // Get user from repository
  // Remove password before returning response
  ///////////////////////////////////////////
  static async getById(id: number): Promise<UserResponse | undefined> {
    const user = await UserRepository.getById(id);

    if (!user) {
      return undefined;
    }

    return this.toResponse(user);
  }

  ///////////////////////////////////////////
  // UPDATE USER
  // Hash password only when it is changed
  // Support partial user updates
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateUserInput,
  ): Promise<UserResponse | undefined> {
    let updateData = { ...data };

    if (data.password) {
      updateData = {
        ...data,
        password: await hashPassword(data.password),
      };
    }

    const user = await UserRepository.update(id, updateData);

    if (!user) {
      return undefined;
    }

    return this.toResponse(user);
  }

  ///////////////////////////////////////////
  // DELETE USER
  // Delete user through repository
  // Return safe response without password
  ///////////////////////////////////////////
  static async deleteById(id: number): Promise<UserResponse | undefined> {
    const user = await UserRepository.deleteById(id);

    if (!user) {
      return undefined;
    }

    return this.toResponse(user);
  }

  ///////////////////////////////////////////
  // REMOVE PASSWORD FROM RESPONSE
  // Prevent exposing sensitive password data
  ///////////////////////////////////////////
  private static toResponse(user: User): UserResponse {
    const { password, ...userResponse } = user;

    return userResponse;
  }

  ///////////////////////////////////////////
  // GET ALL USERS
  // Return users without passwords
  ///////////////////////////////////////////
  static async getAll(): Promise<UserResponse[]> {
    const users = await UserRepository.getAll();

    return users.map((user) => this.toResponse(user));
  }
}
