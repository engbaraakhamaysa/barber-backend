import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateLogin, validateRegister } from "./auth.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// REGISTER
router.post("/register", validateRegister, AuthController.register);

// LOGIN
router.post("/login", validateLogin, AuthController.login);

// CURRENT USER
router.get("/me", authMiddleware, AuthController.me);

export default router;
