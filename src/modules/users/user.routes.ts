import { Router } from "express";
import { UserController } from "./user.controller";
import { validateCreateUser, validateUpdateUser } from "./user.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// CREATE USER
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validateCreateUser,
  UserController.create,
);

// GET USER BY ID
router.get("/:id", authMiddleware, authorize("admin"), UserController.getById);

// UPDATE USER
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validateUpdateUser,
  UserController.update,
);

// DELETE USER
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  UserController.deleteById,
);

export default router;
