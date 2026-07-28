import { CustomerBarberBlockRepository } from "./customer-barber-block.repository";
import {
  CustomerBarberBlock,
  CreateCustomerBarberBlockInput,
} from "./customer-barber-block.types";

export class CustomerBarberBlockService {
  // CREATE BLOCK
  static async create(
    data: CreateCustomerBarberBlockInput,
  ): Promise<CustomerBarberBlock> {
    // Check if customer is already blocked by this barber
    const existingBlock = await CustomerBarberBlockRepository.getActiveBlock(
      data.customer_id,
      data.barber_id,
    );

    if (existingBlock) {
      throw new Error("CUSTOMER_ALREADY_BLOCKED_BY_BARBER");
    }

    try {
      return await CustomerBarberBlockRepository.create(data);
    } catch (error) {
      console.error("Service error (create customer barber block):", error);

      throw error;
    }
  }

  // GET BLOCK BY ID
  static async getById(id: number): Promise<CustomerBarberBlock | undefined> {
    return CustomerBarberBlockRepository.getById(id);
  }

  // GET ACTIVE BLOCKS BY BARBER
  static async getActiveByBarberId(
    barberId: number,
  ): Promise<CustomerBarberBlock[]> {
    return CustomerBarberBlockRepository.getActiveByBarberId(barberId);
  }

  // GET ACTIVE BLOCKS BY CUSTOMER
  static async getActiveByCustomerId(
    customerId: number,
  ): Promise<CustomerBarberBlock[]> {
    return CustomerBarberBlockRepository.getActiveByCustomerId(customerId);
  }

  // UNBLOCK CUSTOMER
  static async unblock(id: number): Promise<CustomerBarberBlock | undefined> {
    return CustomerBarberBlockRepository.unblock(id);
  }

  // DELETE BLOCK RECORD
  static async deleteById(
    id: number,
  ): Promise<CustomerBarberBlock | undefined> {
    return CustomerBarberBlockRepository.deleteById(id);
  }
}
