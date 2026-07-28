import { CustomerRepository } from "./customer.repository";
import {
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
} from "./customer.types";

export class CustomerService {
  // CREATE CUSTOMER
  static async create(data: CreateCustomerInput): Promise<Customer> {
    return CustomerRepository.create(data);
  }

  // GET ALL CUSTOMERS
  static async getAll(): Promise<Customer[]> {
    return CustomerRepository.getAll();
  }

  // GET CUSTOMER BY ID
  static async getById(id: number): Promise<Customer | undefined> {
    return CustomerRepository.getById(id);
  }

  // UPDATE CUSTOMER
  static async update(
    id: number,
    data: UpdateCustomerInput,
  ): Promise<Customer | undefined> {
    return CustomerRepository.update(id, data);
  }

  // DELETE CUSTOMER
  static async deleteById(id: number): Promise<Customer | undefined> {
    return CustomerRepository.deleteById(id);
  }
}
