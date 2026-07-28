import { ShopRepository } from "./shop.repository";
import { Shop, CreateShopInput, UpdateShopInput } from "./shop.types";

export class ShopService {
  // CREATE SHOP
  static async create(data: CreateShopInput): Promise<Shop> {
    return ShopRepository.create(data);
  }

  // GET ALL SHOPS
  static async getAll(): Promise<Shop[]> {
    return ShopRepository.getAll();
  }

  // GET SHOP BY ID
  static async getById(id: number): Promise<Shop | undefined> {
    return ShopRepository.getById(id);
  }

  // UPDATE SHOP
  static async update(
    id: number,
    data: UpdateShopInput,
  ): Promise<Shop | undefined> {
    return ShopRepository.update(id, data);
  }

  // DELETE SHOP
  static async deleteById(id: number): Promise<Shop | undefined> {
    return ShopRepository.deleteById(id);
  }
}
