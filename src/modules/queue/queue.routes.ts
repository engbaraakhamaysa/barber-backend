import { Router } from "express";

import { QueueController } from "./queue.controller";

import { validateJoinQueue, validateUpdateQueue } from "./queue.validation";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize";

const router = Router();

///////////////////////////////////////////
// JOIN QUEUE
// Add a customer to the queue
// Validation runs before the controller
// Public route without authentication
///////////////////////////////////////////
router.post("/", validateJoinQueue, QueueController.joinQueue);

///////////////////////////////////////////
// GET ALL QUEUE
// Return all queue entries
// Accessible by barber and admin only
// Requires valid JWT authentication
///////////////////////////////////////////
router.get(
  "/",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.getAll,
);

///////////////////////////////////////////
// GET CUSTOMER ACTIVE QUEUE
// Return the customer's active queue entry
// Public route without authentication
///////////////////////////////////////////
router.get("/customer/:customerId", QueueController.getActiveByCustomerId);

///////////////////////////////////////////
// GET QUEUE BY BARBER
// Return active queue entries for a barber
// Accessible by barber and admin only
// Requires valid JWT authentication
///////////////////////////////////////////
router.get(
  "/barber/:barberId",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.getByBarberId,
);

///////////////////////////////////////////
// GET NEXT CUSTOMER
// Return the next waiting customer
// Accessible by barber and admin only
// Requires valid JWT authentication
///////////////////////////////////////////
router.get(
  "/barber/:barberId/next",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.getNextWaiting,
);

///////////////////////////////////////////
// GET QUEUE BY ID
// Return a specific queue entry by id
// Accessible by barber and admin only
// Requires valid JWT authentication
///////////////////////////////////////////
router.get(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.getById,
);

///////////////////////////////////////////
// UPDATE QUEUE
// Update queue status or assigned barber
// Validation runs before the controller
// Accessible by barber and admin only
///////////////////////////////////////////
router.put(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  validateUpdateQueue,
  QueueController.update,
);

///////////////////////////////////////////
// DELETE QUEUE
// Permanently remove a queue entry
// Accessible by barber and admin only
// Requires valid JWT authentication
///////////////////////////////////////////
router.delete(
  "/:id",
  authMiddleware,
  authorize("barber", "admin"),
  QueueController.deleteById,
);

export default router;
