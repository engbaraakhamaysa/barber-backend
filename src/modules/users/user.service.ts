import { UserRepository } from "./user.repository";
import {
  User,
  UserResponse,
  CreateUserInput,
  UpdateUserInput,
} from "./user.types";
import { hashPassword } from "../../utils/password";

export class UserService {
  // CREATE USER
  static async create(data: CreateUserInput): Promise<UserResponse> {
    const hashedPassword = await hashPassword(data.password);

    const user = await UserRepository.create({
      ...data,
      password: hashedPassword,
    });

    return this.toResponse(user);
  }

  // GET USER BY ID
  static async getById(id: number): Promise<UserResponse | undefined> {
    const user = await UserRepository.getById(id);

    if (!user) {
      return undefined;
    }

    return this.toResponse(user);
  }

  // UPDATE USER
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

  // DELETE USER
  static async deleteById(id: number): Promise<UserResponse | undefined> {
    const user = await UserRepository.deleteById(id);

    if (!user) {
      return undefined;
    }

    return this.toResponse(user);
  }

  // REMOVE PASSWORD FROM RESPONSE
  private static toResponse(user: User): UserResponse {
    const { password, ...userResponse } = user;

    return userResponse;
  }
}
