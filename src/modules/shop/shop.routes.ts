import { Router } from "express";
import { ShopController } from "./shop.controller";
import { validateCreateShop, validateUpdateShop } from "./shop.validation";

const router = Router();

// CREATE SHOP
router.post("/", validateCreateShop, ShopController.create);

// GET ALL SHOPS
router.get("/", ShopController.getAll);

// GET SHOP BY ID
router.get("/:id", ShopController.getById);

// UPDATE SHOP
router.put("/:id", validateUpdateShop, ShopController.update);

// DELETE SHOP
router.delete("/:id", ShopController.deleteById);

export default router;
