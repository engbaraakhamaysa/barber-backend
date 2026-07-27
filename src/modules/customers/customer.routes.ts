import { Router } from "express";
import { CustomerController } from "./customer.controller";
import { validateCreateCustomer } from "./customer.validation";

const router = Router();

// CREATE CUSTOMER
router.post("/", validateCreateCustomer, CustomerController.create);

// GET CUSTOMERS BY BARBER ID
router.get("/barber/:barber_id", CustomerController.getByBarberId);

// GET CUSTOMER BY ID
router.get("/:id", CustomerController.getById);

// DELETE CUSTOMER
router.delete("/:id", CustomerController.deleteById);

export default router;
