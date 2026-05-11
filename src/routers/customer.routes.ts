import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";

const router = Router();

router.post("/", CustomerController.create);

router.get("/:barber_id", CustomerController.getByBarberId);

router.delete("/:id", CustomerController.deleteById);

export default router;
