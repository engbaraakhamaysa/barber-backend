import { Router } from "express";
import { BookingSlotController } from "./booking-slot.controller";
import {
  validateCreateBookingSlot,
  validateUpdateBookingSlot,
} from "./booking-slot.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// CREATE BOOKING SLOT
// Barber + Admin
router.post(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  validateCreateBookingSlot,
  BookingSlotController.create,
);

// GET ALL BOOKING SLOTS
// Barber + Admin
router.get(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  BookingSlotController.getAll,
);

// GET SLOTS BY BARBER
// Barber + Admin
router.get(
  "/barber/:barberId",
  authMiddleware,
  authorize("barber", "admin"),
  BookingSlotController.getByBarberId,
);

// GET BOOKING SLOT BY ID
// Barber + Admin
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  BookingSlotController.getById,
);

// UPDATE BOOKING SLOT
// Barber + Admin
router.put(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  validateUpdateBookingSlot,
  BookingSlotController.update,
);

// DELETE BOOKING SLOT
// Barber + Admin
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  BookingSlotController.deleteById,
);

export default router;
