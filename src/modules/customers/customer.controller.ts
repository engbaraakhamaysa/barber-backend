import { Request, Response } from "express";
import { CustomerService } from "./customer.service";

export class CustomerController {
  ///////////////////////////////////////////
  // CREATE CUSTOMER
  // Receive customer data from request body
  // Create the customer through the service
  ///////////////////////////////////////////
  static async create(req: Request, res: Response) {
    const { name, phone, user_id } = req.body;

    try {
      const customer = await CustomerService.create({
        name,
        phone,
        user_id,
      });

      return res.status(201).json(customer);
    } catch (error) {
      console.error("Controller error (create customer):", error);

      return res.status(500).json({
        message: "Failed to create customer",
      });
    }
  }

  ///////////////////////////////////////////
  // GET ALL CUSTOMERS
  // Retrieve all customers through the service
  // Return the customer list to the client
  ///////////////////////////////////////////
  static async getAll(req: Request, res: Response) {
    try {
      const customers = await CustomerService.getAll();

      return res.status(200).json(customers);
    } catch (error) {
      console.error("Controller error (get customers):", error);

      return res.status(500).json({
        message: "Failed to get customers",
      });
    }
  }

  ///////////////////////////////////////////
  // GET CUSTOMER BY ID
  // Validate customer ID from route parameters
  // Return the customer when found
  ///////////////////////////////////////////
  static async getById(req: Request, res: Response) {
    const customerId = Number(req.params.id);

    ///////////////////////////////////////////
    // Validate customer ID
    // Ensure the provided ID is a valid number
    ///////////////////////////////////////////
    if (isNaN(customerId)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    try {
      const customer = await CustomerService.getById(customerId);

      if (!customer) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      return res.status(200).json(customer);
    } catch (error) {
      console.error("Controller error (get customer):", error);

      return res.status(500).json({
        message: "Failed to get customer",
      });
    }
  }

  ///////////////////////////////////////////
  // UPDATE CUSTOMER
  // Validate customer ID from route parameters
  // Update the provided customer fields
  ///////////////////////////////////////////
  static async update(req: Request, res: Response) {
    const customerId = Number(req.params.id);

    ///////////////////////////////////////////
    // Validate customer ID
    // Ensure the provided ID is a valid number
    ///////////////////////////////////////////
    if (isNaN(customerId)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    const { name, phone } = req.body;

    try {
      const customer = await CustomerService.update(customerId, {
        name,
        phone,
      });

      if (!customer) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      return res.status(200).json(customer);
    } catch (error) {
      console.error("Controller error (update customer):", error);

      return res.status(500).json({
        message: "Failed to update customer",
      });
    }
  }

  ///////////////////////////////////////////
  // DELETE CUSTOMER
  // Validate customer ID from route parameters
  // Permanently remove the customer
  ///////////////////////////////////////////
  static async deleteById(req: Request, res: Response) {
    const customerId = Number(req.params.id);

    ///////////////////////////////////////////
    // Validate customer ID
    // Ensure the provided ID is a valid number
    ///////////////////////////////////////////
    if (isNaN(customerId)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    try {
      const customer = await CustomerService.deleteById(customerId);

      if (!customer) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      return res.status(200).json({
        message: "Customer deleted successfully",
        customer,
      });
    } catch (error) {
      console.error("Controller error (delete customer):", error);

      return res.status(500).json({
        message: "Failed to delete customer",
      });
    }
  }
}
