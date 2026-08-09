import { CustomerBarberBlockRepository } from "./customer-barber-block.repository";
import {
  CustomerBarberBlock,
  CreateCustomerBarberBlockInput,
} from "./customer-barber-block.types";

export class CustomerBarberBlockService {
  ///////////////////////////////////////////
  // CREATE CUSTOMER-BARBER BLOCK
  // Create a new block between a customer and a barber
  // Prevents creating a duplicate active block for the same customer and barber
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET CUSTOMER-BARBER BLOCK BY ID
  // Return a specific customer-barber block by its ID
  ///////////////////////////////////////////
  static async getById(id: number): Promise<CustomerBarberBlock | undefined> {
    return CustomerBarberBlockRepository.getById(id);
  }

  ///////////////////////////////////////////
  // GET ACTIVE BLOCKS BY BARBER
  // Return all active customer blocks for a specific barber
  ///////////////////////////////////////////
  static async getActiveByBarberId(
    barberId: number,
  ): Promise<CustomerBarberBlock[]> {
    return CustomerBarberBlockRepository.getActiveByBarberId(barberId);
  }

  ///////////////////////////////////////////
  // GET ACTIVE BLOCKS BY CUSTOMER
  // Return all active barber blocks for a specific customer
  ///////////////////////////////////////////
  static async getActiveByCustomerId(
    customerId: number,
  ): Promise<CustomerBarberBlock[]> {
    return CustomerBarberBlockRepository.getActiveByCustomerId(customerId);
  }

  ///////////////////////////////////////////
  // UNBLOCK CUSTOMER
  // Deactivate an active customer-barber block
  // Returns the updated block record when found
  ///////////////////////////////////////////
  static async unblock(id: number): Promise<CustomerBarberBlock | undefined> {
    return CustomerBarberBlockRepository.unblock(id);
  }

  ///////////////////////////////////////////
  // DELETE BLOCK RECORD
  // Permanently delete a customer-barber block by ID
  ///////////////////////////////////////////
  static async deleteById(
    id: number,
  ): Promise<CustomerBarberBlock | undefined> {
    return CustomerBarberBlockRepository.deleteById(id);
  }
}
