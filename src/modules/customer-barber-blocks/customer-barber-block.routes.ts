import { Router } from "express";
import { CustomerBarberBlockController } from "./customer-barber-block.controller";
import { validateCreateCustomerBarberBlock } from "./customer-barber-block.validation";

const router = Router();

// CREATE BLOCK
router.post(
  "/",
  validateCreateCustomerBarberBlock,
  CustomerBarberBlockController.create,
);

// GET ACTIVE BLOCKS BY BARBER
router.get(
  "/barber/:barberId",
  CustomerBarberBlockController.getActiveByBarberId,
);

// GET ACTIVE BLOCKS BY CUSTOMER
router.get(
  "/customer/:customerId",
  CustomerBarberBlockController.getActiveByCustomerId,
);

// GET BLOCK BY ID
router.get("/:id", CustomerBarberBlockController.getById);

// UNBLOCK CUSTOMER
router.patch("/:id/unblock", CustomerBarberBlockController.unblock);

// DELETE BLOCK RECORD
router.delete("/:id", CustomerBarberBlockController.deleteById);

export default router;
