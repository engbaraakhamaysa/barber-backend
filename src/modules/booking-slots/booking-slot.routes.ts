import { Router } from "express";
import { BookingSlotController } from "./booking-slot.controller";
import {
  validateCreateBookingSlot,
  validateUpdateBookingSlot,
} from "./booking-slot.validation";

const router = Router();

// CREATE BOOKING SLOT
router.post("/", validateCreateBookingSlot, BookingSlotController.create);

// GET ALL BOOKING SLOTS
router.get("/", BookingSlotController.getAll);

// GET AVAILABLE SLOTS BY SHOP
router.get(
  "/shop/:shopId/available",
  BookingSlotController.getAvailableByShopId,
);

// GET AVAILABLE SLOTS BY BARBER
router.get(
  "/barber/:barberId/available",
  BookingSlotController.getAvailableByBarberId,
);

// GET BOOKING SLOT BY ID
router.get("/:id", BookingSlotController.getById);

// UPDATE BOOKING SLOT
router.put("/:id", validateUpdateBookingSlot, BookingSlotController.update);

// DELETE BOOKING SLOT
router.delete("/:id", BookingSlotController.deleteById);

export default router;
