import { BarberRepository } from "./barber.repository";
import {
  BarberWithUser,
  CreateBarberInput,
  UpdateBarberInput,
} from "./barber.types";
import { hashPassword } from "../../utils/password";

export class BarberService {
  ///////////////////////////////////////////
  // CREATE BARBER
  // Hash password before creating barber
  // Create barber through repository
  ///////////////////////////////////////////
  static async create(data: CreateBarberInput): Promise<BarberWithUser> {
    const hashedPassword = await hashPassword(data.password);

    return BarberRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  ///////////////////////////////////////////
  // GET BARBER BY ID
  // Get barber using unique barber id
  // Return barber with user information
  ///////////////////////////////////////////
  static async getById(id: number): Promise<BarberWithUser | undefined> {
    return BarberRepository.getById(id);
  }

  ///////////////////////////////////////////
  // GET BARBERS BY SHOP ID
  // Return all barbers assigned to a shop
  ///////////////////////////////////////////
  static async getByShopId(shopId: number): Promise<BarberWithUser[]> {
    return BarberRepository.getByShopId(shopId);
  }

  ///////////////////////////////////////////
  // UPDATE BARBER
  // Update barber and linked user information
  // Hash password only when it is changed
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // DELETE BARBER
  // Delete barber through repository
  ///////////////////////////////////////////
  static async deleteById(id: number) {
    return BarberRepository.deleteById(id);
  }
}
