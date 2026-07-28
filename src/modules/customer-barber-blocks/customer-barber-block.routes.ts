import { Router } from "express";
import { CustomerBarberBlockController } from "./customer-barber-block.controller";
import { validateCreateCustomerBarberBlock } from "./customer-barber-block.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// CREATE BLOCK
// Barber + Admin
router.post(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  validateCreateCustomerBarberBlock,
  CustomerBarberBlockController.create,
);

// GET ACTIVE BLOCKS BY BARBER
// Barber + Admin
router.get(
  "/barber/:barberId",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.getActiveByBarberId,
);

// GET ACTIVE BLOCKS BY CUSTOMER
// Barber + Admin
router.get(
  "/customer/:customerId",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.getActiveByCustomerId,
);

// GET BLOCK BY ID
// Barber + Admin
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.getById,
);

// UNBLOCK CUSTOMER
// Barber + Admin
router.patch(
  "/:id/unblock",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.unblock,
);

// DELETE BLOCK RECORD
// Barber + Admin
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  CustomerBarberBlockController.deleteById,
);

export default router;
