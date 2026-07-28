import { Router } from "express";
import { UserController } from "./user.controller";
import { validateCreateUser, validateUpdateUser } from "./user.validation";

const router = Router();

// CREATE USER
router.post("/", validateCreateUser, UserController.create);

// GET USER BY ID
router.get("/:id", UserController.getById);

// UPDATE USER
router.put("/:id", validateUpdateUser, UserController.update);

// DELETE USER
router.delete("/:id", UserController.deleteById);

export default router;
