import { Router } from "express";
import { QueueController } from "./queue.controller";
import { validateJoinQueue, validateUpdateQueue } from "./queue.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

// JOIN QUEUE
// Public - Customer can join without account
router.post("/", validateJoinQueue, QueueController.joinQueue);

// GET ALL QUEUE ENTRIES
// Barber + Admin
router.get(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.getAll,
);

// GET TODAY'S QUEUE BY SHOP
// Barber + Admin
router.get(
  "/shop/:shopId",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.getByShopId,
);

// GET NEXT WAITING CUSTOMER
// Barber + Admin
router.get(
  "/shop/:shopId/next",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.getNextWaiting,
);

// GET CUSTOMER ACTIVE QUEUE
// Public - Customer can check using customerId + shopId
router.get(
  "/customer/:customerId/shop/:shopId",
  QueueController.getActiveByCustomerId,
);

// GET QUEUE ENTRY BY ID
// Barber + Admin
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.getById,
);

// UPDATE QUEUE ENTRY
// Barber + Admin
router.put(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  validateUpdateQueue,
  QueueController.update,
);

// DELETE QUEUE ENTRY
// Barber + Admin
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.deleteById,
);

export default router;
