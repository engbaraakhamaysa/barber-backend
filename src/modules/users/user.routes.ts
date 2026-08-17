import { Router } from "express";
import { UserController } from "./user.controller";
import { validateCreateUser, validateUpdateUser } from "./user.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

///////////////////////////////////////////
// GET ALL USERS ROUTE
// Return all users
// Accessible by admin only
///////////////////////////////////////////

router.get("/", authMiddleware, authorize("admin"), UserController.getAll);

///////////////////////////////////////////
// CREATE USER ROUTE
// Protected route for admin only
// Validate data before creating user
///////////////////////////////////////////
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validateCreateUser,
  UserController.create,
);

///////////////////////////////////////////
// GET USER BY ID ROUTE
// Get single user by id
// Accessible by admin only
///////////////////////////////////////////
router.get("/:id", authMiddleware, authorize("admin"), UserController.getById);

///////////////////////////////////////////
// UPDATE USER ROUTE
// Update user information
// Validate provided fields before update
///////////////////////////////////////////
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validateUpdateUser,
  UserController.update,
);

///////////////////////////////////////////
// DELETE USER ROUTE
// Delete user by id
// Accessible by admin only
///////////////////////////////////////////
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  UserController.deleteById,
);

export default router;
