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
    const hashedPassword = await hashPassword(data.password);

    return BarberRepository.create({
      ...data,
      password: hashedPassword,
    });
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
