import { Router } from "express";
import { BookingController } from "./booking.controller";
import {
  validateCreateBooking,
  validateUpdateBooking,
} from "./booking.validation";

const router = Router();

// CREATE BOOKING
router.post("/", validateCreateBooking, BookingController.create);

// GET ALL BOOKINGS
router.get("/", BookingController.getAll);

// GET BOOKINGS BY CUSTOMER
router.get("/customer/:customerId", BookingController.getByCustomerId);

// GET BOOKINGS BY BARBER
router.get("/barber/:barberId", BookingController.getByBarberId);

// GET BOOKING BY ID
router.get("/:id", BookingController.getById);

// UPDATE BOOKING STATUS
router.put("/:id", validateUpdateBooking, BookingController.update);

// DELETE BOOKING
router.delete("/:id", BookingController.deleteById);

export default router;
