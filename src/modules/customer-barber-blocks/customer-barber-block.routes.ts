import { Router } from "express";
import { CustomerBarberBlockController } from "./customer-barber-block.controller";
import { validateCreateCustomerBarberBlock } from "./customer-barber-block.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

///////////////////////////////////////////
// CREATE CUSTOMER-BARBER BLOCK
// Block a customer from a specific barber
// Accessible by barber and admin users only
// Requires authentication and role authorization
// Validate customer, barber, and optional reason before creation
///////////////////////////////////////////
router.post(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  validateCreateCustomerBarberBlock,
  CustomerBarberBlockController.create,
);

///////////////////////////////////////////
// GET ACTIVE BLOCKS BY BARBER
// Return all active customer blocks for a specific barber
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.get(
  "/barber/:barberId",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.getActiveByBarberId,
);

///////////////////////////////////////////
// GET ACTIVE BLOCKS BY CUSTOMER
// Return all active barber blocks for a specific customer
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.get(
  "/customer/:customerId",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.getActiveByCustomerId,
);

///////////////////////////////////////////
// GET CUSTOMER-BARBER BLOCK BY ID
// Return a specific customer-barber block by ID
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.getById,
);

///////////////////////////////////////////
// UNBLOCK CUSTOMER
// Deactivate an active customer-barber block
// Sets the block as inactive and records the unblocked time
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.patch(
  "/:id/unblock",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.unblock,
);

///////////////////////////////////////////
// DELETE BLOCK RECORD
// Permanently delete a customer-barber block record
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.deleteById,
);

export default router;
