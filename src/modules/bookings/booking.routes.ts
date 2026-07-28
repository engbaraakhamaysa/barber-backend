import { Router } from "express";
import { BookingController } from "./booking.controller";
import {
  validateCreateBooking,
  validateUpdateBooking,
} from "./booking.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// CREATE BOOKING
// Public
// Customer can book without account
router.post("/", validateCreateBooking, BookingController.create);

// GET ALL BOOKINGS
// Barber + Admin
router.get(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.getAll,
);

// GET BOOKINGS BY CUSTOMER
// Barber + Admin
router.get(
  "/customer/:customerId",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.getByCustomerId,
);

// GET BOOKINGS BY BARBER
// Barber + Admin
router.get(
  "/barber/:barberId",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.getByBarberId,
);

// GET BOOKING BY ID
// Barber + Admin
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.getById,
);

// UPDATE BOOKING STATUS
// Barber + Admin
router.put(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  validateUpdateBooking,
  BookingController.update,
);

// DELETE BOOKING
// Barber + Admin
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  BookingController.deleteById,
);

export default router;
