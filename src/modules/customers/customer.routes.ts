import { Router } from "express";
import { CustomerController } from "./customer.controller";
import {
  validateCreateCustomer,
  validateUpdateCustomer,
} from "./customer.validation";

const router = Router();

// CREATE CUSTOMER
router.post("/", validateCreateCustomer, CustomerController.create);

// GET ALL CUSTOMERS
router.get("/", CustomerController.getAll);

// GET CUSTOMER BY ID
router.get("/:id", CustomerController.getById);

// UPDATE CUSTOMER
router.put("/:id", validateUpdateCustomer, CustomerController.update);

// DELETE CUSTOMER
router.delete("/:id", CustomerController.deleteById);

export default router;
