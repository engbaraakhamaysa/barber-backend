import { CustomerRepository } from "./customer.repository";
import {
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
} from "./customer.types";

export class CustomerService {
  ///////////////////////////////////////////
  // CREATE CUSTOMER
  // Create a new customer through the repository
  // Return the created customer
  ///////////////////////////////////////////
  static async create(data: CreateCustomerInput): Promise<Customer> {
    return CustomerRepository.create(data);
  }

  ///////////////////////////////////////////
  // GET ALL CUSTOMERS
  // Retrieve all customers from the repository
  // Return the complete customer list
  ///////////////////////////////////////////
  static async getAll(): Promise<Customer[]> {
    return CustomerRepository.getAll();
  }

  ///////////////////////////////////////////
  // GET CUSTOMER BY ID
  // Retrieve a customer using their unique ID
  // Return undefined when the customer does not exist
  ///////////////////////////////////////////
  static async getById(id: number): Promise<Customer | undefined> {
    return CustomerRepository.getById(id);
  }

  ///////////////////////////////////////////
  // UPDATE CUSTOMER
  // Update the provided customer fields
  // Return the updated customer when successful
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateCustomerInput,
  ): Promise<Customer | undefined> {
    return CustomerRepository.update(id, data);
  }

  ///////////////////////////////////////////
  // DELETE CUSTOMER
  // Delete a customer using their unique ID
  // Return the deleted customer when successful
  ///////////////////////////////////////////
  static async deleteById(id: number): Promise<Customer | undefined> {
    return CustomerRepository.deleteById(id);
  }
}
