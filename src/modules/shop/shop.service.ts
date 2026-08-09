import { ShopRepository } from "./shop.repository";
import { Shop, CreateShopInput, UpdateShopInput } from "./shop.types";

export class ShopService {
  ///////////////////////////////////////////
  // CREATE SHOP
  // Create a new shop through repository
  ///////////////////////////////////////////
  static async create(data: CreateShopInput): Promise<Shop> {
    return ShopRepository.create(data);
  }

  ///////////////////////////////////////////
  // GET ALL SHOPS
  // Return all shops from repository
  ///////////////////////////////////////////
  static async getAll(): Promise<Shop[]> {
    return ShopRepository.getAll();
  }

  ///////////////////////////////////////////
  // GET SHOP BY ID
  // Find shop using unique shop id
  ///////////////////////////////////////////
  static async getById(id: number): Promise<Shop | undefined> {
    return ShopRepository.getById(id);
  }

  ///////////////////////////////////////////
  // UPDATE SHOP
  // Update provided shop fields
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateShopInput,
  ): Promise<Shop | undefined> {
    return ShopRepository.update(id, data);
  }

  ///////////////////////////////////////////
  // DELETE SHOP
  // Remove shop through repository
  ///////////////////////////////////////////
  static async deleteById(id: number): Promise<Shop | undefined> {
    return ShopRepository.deleteById(id);
  }
}
