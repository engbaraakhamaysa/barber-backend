import { Router } from "express";
import { BookingSlotController } from "./booking-slot.controller";
import {
  validateCreateBookingSlot,
  validateUpdateBookingSlot,
} from "./booking-slot.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

///////////////////////////////////////////
// CREATE BOOKING SLOT
// Create a new booking slot for a barber
// Requires authentication
// Accessible by barber and admin users only
// Validate booking slot data before creation
///////////////////////////////////////////
router.post(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  validateCreateBookingSlot,
  BookingSlotController.create,
);

///////////////////////////////////////////
// GET ALL BOOKING SLOTS
// Return all booking slots in the system
// Requires authentication
// Accessible by barber and admin users only
///////////////////////////////////////////
router.get(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  BookingSlotController.getAll,
);

///////////////////////////////////////////
// GET SLOTS BY BARBER
// Return all booking slots belonging to a specific barber
// Requires authentication
// Accessible by barber and admin users only
///////////////////////////////////////////
router.get(
  "/barber/:barberId",
  authMiddleware,
  authorize("barber", "admin"),
  BookingSlotController.getByBarberId,
);

///////////////////////////////////////////
// GET BOOKING SLOT BY ID
// Return a specific booking slot by ID
// Requires authentication
// Accessible by barber and admin users only
///////////////////////////////////////////
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  BookingSlotController.getById,
);

///////////////////////////////////////////
// UPDATE BOOKING SLOT
// Update the time of an existing booking slot
// Requires authentication
// Accessible by barber and admin users only
// Validate provided fields before updating
///////////////////////////////////////////
router.put(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  validateUpdateBookingSlot,
  BookingSlotController.update,
);

///////////////////////////////////////////
// DELETE BOOKING SLOT
// Permanently delete a booking slot by ID
// Requires authentication
// Accessible by barber and admin users only
///////////////////////////////////////////
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  BookingSlotController.deleteById,
);

export default router;
