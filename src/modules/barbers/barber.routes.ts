import { Router } from "express";
import { BarberController } from "./barber.controller";
import {
  validateCreateBarber,
  validateUpdateBarber,
} from "./barber.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

///////////////////////////////////////////
// CREATE BARBER ROUTE
// Protected route for admin only
// Validate data before creating barber
///////////////////////////////////////////
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validateCreateBarber,
  BarberController.create,
);

///////////////////////////////////////////
// GET BARBERS BY SHOP ID ROUTE
// Get all barbers assigned to a shop
// Requires valid authentication
///////////////////////////////////////////
router.get("/shop/:shopId", authMiddleware, BarberController.getByShopId);

///////////////////////////////////////////
// GET BARBER BY ID ROUTE
// Get single barber by id
// Requires valid authentication
///////////////////////////////////////////
router.get("/:id", authMiddleware, BarberController.getById);

///////////////////////////////////////////
// UPDATE BARBER ROUTE
// Update barber information
// Validate provided fields before update
///////////////////////////////////////////
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validateUpdateBarber,
  BarberController.update,
);

///////////////////////////////////////////
// DELETE BARBER ROUTE
// Delete barber by id
// Accessible by admin only
///////////////////////////////////////////
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  BarberController.deleteById,
);

export default router;
