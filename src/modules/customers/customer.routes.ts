import { Router } from "express";
import { CustomerController } from "./customer.controller";
import {
  validateCreateCustomer,
  validateUpdateCustomer,
} from "./customer.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// CREATE CUSTOMER
// Public
router.post("/", validateCreateCustomer, CustomerController.create);

// GET ALL CUSTOMERS
// Barber + Admin
router.get(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerController.getAll,
);

// GET CUSTOMER BY ID
// Barber + Admin
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerController.getById,
);

// UPDATE CUSTOMER
// Barber + Admin
router.put(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  validateUpdateCustomer,
  CustomerController.update,
);

// DELETE CUSTOMER
// Barber + Admin
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerController.deleteById,
);

export default router;
