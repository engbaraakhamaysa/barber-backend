import { Router } from "express";
import { ShopController } from "./shop.controller";
import { validateCreateShop, validateUpdateShop } from "./shop.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";
const router = Router();

// CREATE SHOP
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validateCreateShop,
  ShopController.create,
);

// GET ALL SHOPS
router.get("/", authMiddleware, ShopController.getAll);

// GET SHOP BY ID
router.get("/:id", authMiddleware, ShopController.getById);

// UPDATE SHOP
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validateUpdateShop,
  ShopController.update,
);

// DELETE SHOP
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  ShopController.deleteById,
);

export default router;
