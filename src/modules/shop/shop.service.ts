import { ShopRepository } from "./shop.repository";
import { Shop } from "./shop.types";

export class ShopService {
  static async create(name: string, location: string): Promise<Shop> {
    return ShopRepository.create(name, location);
  }

  static async getAll(): Promise<Shop[]> {
    return ShopRepository.getAll();
  }

  static async getById(id: number): Promise<Shop | undefined> {
    return ShopRepository.getById(id);
  }

  static async deleteById(id: number): Promise<Shop | undefined> {
    return ShopRepository.deleteById(id);
  }
}
