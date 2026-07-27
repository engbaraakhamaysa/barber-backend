import { Router } from "express";
import { BarberController } from "./barber.controller";
import {
  validateCreateBarber,
  validateUpdateBarber,
  validateLoginBarber,
} from "./barber.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// CREATE BARBER
// Public for now
router.post("/", validateCreateBarber, BarberController.create);

// GET BARBERS BY SHOP ID
// Public
router.get("/shop/:id", BarberController.getByShopId);

// GET BARBER BY ID
// Protected
router.get("/:id", authMiddleware, BarberController.getById);

// UPDATE BARBER
// Protected
router.put("/", authMiddleware, validateUpdateBarber, BarberController.update);

// DELETE BARBER
// Protected
router.delete("/:id", authMiddleware, BarberController.deleteById);

// LOGIN BARBER
// Public
router.post("/login", validateLoginBarber, BarberController.login);

export default router;
