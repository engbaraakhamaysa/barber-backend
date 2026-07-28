import { Router } from "express";
import { QueueController } from "./queue.controller";
import { validateJoinQueue, validateUpdateQueue } from "./queue.validation";

const router = Router();

// JOIN QUEUE
router.post("/", validateJoinQueue, QueueController.joinQueue);

// GET ALL QUEUE ENTRIES
router.get("/", QueueController.getAll);

// GET TODAY'S QUEUE BY SHOP
router.get("/shop/:shopId", QueueController.getByShopId);

// GET NEXT WAITING CUSTOMER
router.get("/shop/:shopId/next", QueueController.getNextWaiting);

// GET CUSTOMER ACTIVE QUEUE
router.get(
  "/customer/:customerId/shop/:shopId",
  QueueController.getActiveByCustomerId,
);

// GET QUEUE ENTRY BY ID
router.get("/:id", QueueController.getById);

// UPDATE QUEUE ENTRY
router.put("/:id", validateUpdateQueue, QueueController.update);

// DELETE QUEUE ENTRY
router.delete("/:id", QueueController.deleteById);

export default router;
