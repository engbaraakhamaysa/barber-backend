import { Router } from "express";
import { BarberController } from "./barber.controller";
import {
  validateCreateBarber,
  validateUpdateBarber,
} from "./barber.validation";

const router = Router();

// CREATE BARBER
router.post("/", validateCreateBarber, BarberController.create);

// GET BARBERS BY SHOP ID
router.get("/shop/:shopId", BarberController.getByShopId);

// GET BARBER BY ID
router.get("/:id", BarberController.getById);

// UPDATE BARBER
router.put("/:id", validateUpdateBarber, BarberController.update);

// DELETE BARBER
router.delete("/:id", BarberController.deleteById);

export default router;
