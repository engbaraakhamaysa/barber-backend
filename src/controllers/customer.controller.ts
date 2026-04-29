import { Request, Response } from "express";
import { CustomerModel } from "../models/customer.model";

// CREATE
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;

    const customer = await CustomerModel.create(name, phone);

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error creating customer" });
  }
};

// GET ALL
export const getAllCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await CustomerModel.getAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error getting customers" });
  }
};

// GET BY ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const customer = await CustomerModel.getById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error getting customer" });
  }
};

// UPDATE
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, phone } = req.body;

    const customer = await CustomerModel.update(id, name, phone);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error updating customer" });
  }
};

// DELETE
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const customer = await CustomerModel.delete(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted", customer });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer" });
  }
};
