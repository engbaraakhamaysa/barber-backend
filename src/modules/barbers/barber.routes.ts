import { Router } from "express";
import { BarberController } from "./barber.controller";
import {
  validateCreateBarber,
  validateUpdateBarber,
  validateLoginBarber,
} from "./barber.validation";

const router = Router();

// CREATE BARBER
router.post("/", validateCreateBarber, BarberController.create);

// GET BARBERS BY SHOP ID
router.get("/shop/:id", BarberController.getByShopId);

// GET BARBER BY ID
router.get("/:id", BarberController.getById);

// UPDATE BARBER
router.put("/", validateUpdateBarber, BarberController.update);

// DELETE BARBER
router.delete("/:id", BarberController.deleteById);

// LOGIN BARBER
router.post("/login", validateLoginBarber, BarberController.login);

export default router;
