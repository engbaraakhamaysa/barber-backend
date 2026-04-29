import { Router } from "express";
import {
  createQueue,
  getAllQueue,
  getQueueById,
  updateQueueStatus,
  deleteQueue,
} from "../controllers/queue.controller";

const router = Router();

router.post("/", createQueue);
router.get("/", getAllQueue);
router.get("/:id", getQueueById);
router.put("/:id", updateQueueStatus);
router.delete("/:id", deleteQueue);

export default router;
