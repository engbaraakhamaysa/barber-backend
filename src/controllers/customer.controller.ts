import { Request, Response } from "express";
import { CustomerModel } from "../models/customer.model";

export class CustomerController {
  /////////////////////////////////////////////////////////
  //                CREATE CUSTOMER                     //
  /////////////////////////////////////////////////////////

  static async create(req: Request, res: Response) {
    const { barber_id, name, phone } = req.body;

    if (!barber_id || !name) {
      return res.status(400).json({ message: "Field are required" });
    }
    try {
      const customer = await CustomerModel.create(barber_id, name, phone);

      return res.status(201).json(customer);
    } catch (error) {
      console.error("Create customer error:", error);

      return res.status(500).json({
        message: "Failed to create customer",
      });
    }
  }

  /////////////////////////////////////////////////////////
  //          GET CUSTOMERS BY BARBER ID                //
  /////////////////////////////////////////////////////////

  static async getByBarberId(req: Request, res: Response) {
    const { barber_id } = req.params;
    try {
      const customers = await CustomerModel.getByBarberId(Number(barber_id));

      return res.status(200).json(customers);
    } catch (error) {
      console.error("Get customers error:", error);

      return res.status(500).json({
        message: "Failed to get customers",
      });
    }
  }

  /////////////////////////////////////////////////////////
  //                DELETE CUSTOMER                     //
  /////////////////////////////////////////////////////////

  static async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const customer = await CustomerModel.deleteById(Number(id));
      return res.status(200).json(customer);
    } catch (error) {
      console.error("Delete customer error:", error);

      return res.status(500).json({
        message: "Failed to delete customer",
      });
    }
  }
}
