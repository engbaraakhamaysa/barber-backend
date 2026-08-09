import { Router } from "express";
import { CustomerController } from "./customer.controller";
import {
  validateCreateCustomer,
  validateUpdateCustomer,
} from "./customer.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

///////////////////////////////////////////
// CREATE CUSTOMER
// Create a new customer account
// Public route without authentication
// Validate customer data before creation
///////////////////////////////////////////
router.post("/", validateCreateCustomer, CustomerController.create);

///////////////////////////////////////////
// GET ALL CUSTOMERS
// Return all customers in the system
// Accessible by barber and admin users only
///////////////////////////////////////////
router.get(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerController.getAll,
);

///////////////////////////////////////////
// GET CUSTOMER BY ID
// Return a specific customer by ID
// Accessible by barber and admin users only
///////////////////////////////////////////
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerController.getById,
);

///////////////////////////////////////////
// UPDATE CUSTOMER
// Update customer information
// Validate provided fields before updating
// Accessible by barber and admin users only
///////////////////////////////////////////
router.put(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  validateUpdateCustomer,
  CustomerController.update,
);

///////////////////////////////////////////
// DELETE CUSTOMER
// Permanently delete a customer by ID
// Accessible by barber and admin users only
///////////////////////////////////////////
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerController.deleteById,
);

export default router;
