import { Router } from "express";
import {
  createShop,
  deleteShop,
  getAllShops,
  getShopById,
  updateShop,
  loginShop,
} from "../controllers/shop.controller";

const router = Router();

// CREATE
router.post("/", createShop);

// GET ALL
router.get("/", getAllShops);

// GET BY ID
router.get("/:id", getShopById);

// UPDATE
router.put("/:id", updateShop);

// DELETE
router.delete("/:id", deleteShop);

router.post("/login", loginShop);

export default router;
