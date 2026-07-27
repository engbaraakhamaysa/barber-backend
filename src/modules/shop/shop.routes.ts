import { Router } from "express";
import { ShopController } from "./shop.controller";
import { validateCreateShop } from "./shop.validation";

const router = Router();

router.get("/", ShopController.getAll);

router.get("/:id", ShopController.getById);

router.post("/", validateCreateShop, ShopController.create);

router.delete("/:id", ShopController.deleteById);

export default router;
