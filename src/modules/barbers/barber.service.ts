import { BarberRepository } from "./barber.repository";
import {
  Barber,
  CreateBarberInput,
  UpdateBarberInput,
  LoginBarberInput,
} from "./barber.types";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

export class BarberService {
  // ==========================================================
  // CREATE BARBER
  // ==========================================================

  static async create(data: CreateBarberInput): Promise<Barber> {
    const hashedPassword = await hashPassword(data.password);

    return BarberRepository.create(
      data.shop_id,
      data.name,
      data.email,
      hashedPassword,
    );
  }

  // ==========================================================
  // GET BARBERS BY SHOP ID
  // ==========================================================

  static async getByShopId(shopId: number): Promise<Barber[]> {
    return BarberRepository.getByShopId(shopId);
  }

  // ==========================================================
  // GET BARBER BY ID
  // ==========================================================

  static async getById(id: number): Promise<Barber | undefined> {
    return BarberRepository.getById(id);
  }

  // ==========================================================
  // UPDATE BARBER
  // ==========================================================

  static async update(
    id: number,
    data: UpdateBarberInput,
  ): Promise<Barber | undefined> {
    let hashedPassword = data.password;

    if (data.password) {
      hashedPassword = await hashPassword(data.password);
    }

    return BarberRepository.update(
      id,
      data.name,
      data.email,
      hashedPassword,
      data.is_active,
    );
  }

  // ==========================================================
  // DELETE BARBER
  // ==========================================================

  static async deleteById(id: number): Promise<Barber | undefined> {
    return BarberRepository.deleteById(id);
  }

  // ==========================================================
  // LOGIN BARBER
  // ==========================================================

  static async login(data: LoginBarberInput) {
    const barber = await BarberRepository.getByEmail(data.email);

    if (!barber) {
      return undefined;
    }

    const isPasswordValid = await comparePassword(
      data.password,
      barber.password,
    );

    if (!isPasswordValid) {
      return undefined;
    }

    const token = generateToken({
      id: barber.id,
      email: barber.email,
      shop_id: barber.shop_id,
    });

    return {
      barber: {
        id: barber.id,
        shop_id: barber.shop_id,
        name: barber.name,
        email: barber.email,
        is_active: barber.is_active,
        created_at: barber.created_at,
      },
      token,
    };
  }
}
