import { Router } from "express";
import { BookingSlotController } from "./booking-slot.controller";
import {
  validateCreateBookingSlots,
  validateBookSlot,
} from "./booking-slot.validation";

const router = Router();

// CREATE BOOKING SLOTS
router.post("/", validateCreateBookingSlots, BookingSlotController.createSlots);

// GET ALL SLOTS BY BARBER ID
router.get("/barber/:barber_id", BookingSlotController.getAllByBarber);

// GET SLOT BY ID
router.get("/:id", BookingSlotController.getById);

// DELETE SLOT
router.delete("/:id", BookingSlotController.deleteById);

// BOOK SLOT
router.post("/book", validateBookSlot, BookingSlotController.bookSlot);

export default router;
