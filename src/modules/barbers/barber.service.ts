import { BarberRepository } from "./barber.repository";
import {
  Barber,
  CreateBarberInput,
  UpdateBarberInput,
  LoginBarberInput,
} from "./barber.types";

export class BarberService {
  // CREATE BARBER
  static async create(data: CreateBarberInput): Promise<Barber> {
    return BarberRepository.create(
      data.shop_id,
      data.name,
      data.email,
      data.password,
    );
  }

  // GET BARBERS BY SHOP ID
  static async getByShopId(shopId: number): Promise<Barber[]> {
    return BarberRepository.getByShopId(shopId);
  }

  // GET BARBER BY ID
  static async getById(id: number): Promise<Barber | undefined> {
    return BarberRepository.getById(id);
  }

  // UPDATE BARBER
  static async update(
    id: number,
    data: UpdateBarberInput,
  ): Promise<Barber | undefined> {
    return BarberRepository.update(
      id,
      data.name,
      data.email,
      data.password,
      data.is_active,
    );
  }

  // DELETE BARBER
  static async deleteById(id: number): Promise<Barber | undefined> {
    return BarberRepository.deleteById(id);
  }

  // LOGIN BARBER
  static async login(data: LoginBarberInput): Promise<Barber | undefined> {
    const barber = await BarberRepository.getByEmail(data.email);

    if (!barber) {
      return undefined;
    }

    // Password verification will be added later.
    // For now, we only check the stored password.
    if (barber.password !== data.password) {
      return undefined;
    }

    return barber;
  }
}
