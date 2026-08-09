import { Router } from "express";
import { BookingController } from "./booking.controller";
import {
  validateCreateBooking,
  validateUpdateBooking,
} from "./booking.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

///////////////////////////////////////////
// CREATE BOOKING
// Create a new booking for a customer
// Public route without authentication
// Customer can book without creating an account
// Validate booking data before creation
///////////////////////////////////////////
router.post("/", validateCreateBooking, BookingController.create);

///////////////////////////////////////////
// GET ALL BOOKINGS
// Return all bookings in the system
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.get(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.getAll,
);

///////////////////////////////////////////
// GET BOOKINGS BY CUSTOMER
// Return all bookings belonging to a specific customer
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.get(
  "/customer/:customerId",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.getByCustomerId,
);

///////////////////////////////////////////
// GET BOOKINGS BY BARBER
// Return all bookings assigned to a specific barber
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.get(
  "/barber/:barberId",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.getByBarberId,
);

///////////////////////////////////////////
// GET BOOKING BY ID
// Return a specific booking by ID
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.getById,
);

///////////////////////////////////////////
// UPDATE BOOKING STATUS
// Update the status of a specific booking
// Accessible by barber and admin users only
// Validate booking status before updating
// Requires authentication and role authorization
///////////////////////////////////////////
router.put(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  validateUpdateBooking,
  BookingController.update,
);

///////////////////////////////////////////
// DELETE BOOKING
// Permanently delete a specific booking by ID
// Accessible by barber and admin users only
// Requires authentication and role authorization
///////////////////////////////////////////
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.deleteById,
);

export default router;
