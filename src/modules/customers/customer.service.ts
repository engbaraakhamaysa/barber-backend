import { CustomerRepository } from "./customer.repository";
import { Customer, CreateCustomerInput } from "./customer.types";

export class CustomerService {
  // CREATE CUSTOMER
  static async create(data: CreateCustomerInput): Promise<Customer> {
    return CustomerRepository.create(data.barber_id, data.name, data.phone);
  }

  // GET CUSTOMERS BY BARBER ID
  static async getByBarberId(barberId: number): Promise<Customer[]> {
    return CustomerRepository.getByBarberId(barberId);
  }

  // GET CUSTOMER BY ID
  static async getById(id: number): Promise<Customer | undefined> {
    return CustomerRepository.getById(id);
  }

  // DELETE CUSTOMER
  static async deleteById(id: number): Promise<Customer | undefined> {
    return CustomerRepository.deleteById(id);
  }
}
