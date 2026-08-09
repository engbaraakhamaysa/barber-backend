import { Router } from "express";
import { ShopController } from "./shop.controller";
import { validateCreateShop, validateUpdateShop } from "./shop.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

///////////////////////////////////////////
// CREATE SHOP ROUTE
// Protected route for admin only
// Validate data before creating shop
///////////////////////////////////////////
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validateCreateShop,
  ShopController.create,
);

///////////////////////////////////////////
// GET ALL SHOPS ROUTE
// Get all shops
// Requires valid authentication
///////////////////////////////////////////
router.get("/", authMiddleware, ShopController.getAll);

///////////////////////////////////////////
// GET SHOP BY ID ROUTE
// Get single shop by id
// Requires valid authentication
///////////////////////////////////////////
router.get("/:id", authMiddleware, ShopController.getById);

///////////////////////////////////////////
// UPDATE SHOP ROUTE
// Update shop information
// Validate provided fields before update
///////////////////////////////////////////
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validateUpdateShop,
  ShopController.update,
);

///////////////////////////////////////////
// DELETE SHOP ROUTE
// Delete shop by id
// Accessible by admin only
///////////////////////////////////////////
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  ShopController.deleteById,
);

export default router;
