import { Router } from "express";
import { ShopController } from "../controllers/shop.controller";

const router = Router();

router.get("/", ShopController.getAll);

router.get("/:id", ShopController.getById);

router.post("/", ShopController.create);
router.delete("/:id", ShopController.deleteByID);

export default router;
