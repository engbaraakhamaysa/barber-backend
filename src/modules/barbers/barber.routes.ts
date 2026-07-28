import { Router } from "express";
import { BarberController } from "./barber.controller";
import {
  validateCreateBarber,
  validateUpdateBarber,
} from "./barber.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// CREATE BARBER
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validateCreateBarber,
  BarberController.create,
);

// GET BARBERS BY SHOP ID
router.get("/shop/:shopId", authMiddleware, BarberController.getByShopId);

// GET BARBER BY ID
router.get("/:id", authMiddleware, BarberController.getById);

// UPDATE BARBER
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validateUpdateBarber,
  BarberController.update,
);

// DELETE BARBER
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  BarberController.deleteById,
);

export default router;
