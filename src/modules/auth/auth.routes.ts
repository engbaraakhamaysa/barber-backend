import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateLogin, validateRegister } from "./auth.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

///////////////////////////////////////////
// REGISTER
// Create new account
// Validation runs before controller
///////////////////////////////////////////
router.post("/register", validateRegister, AuthController.register);

///////////////////////////////////////////
// LOGIN
// Authenticate user
// Return access token after success
///////////////////////////////////////////
router.post("/login", validateLogin, AuthController.login);

///////////////////////////////////////////
// CURRENT USER
// Get logged-in user information
// Requires valid JWT token
///////////////////////////////////////////
router.get("/me", authMiddleware, AuthController.me);

export default router;
