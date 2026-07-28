import { Request, Response } from "express";
import { QueueService } from "./queue.service";

export class QueueController {
  // JOIN QUEUE
  static async joinQueue(req: Request, res: Response) {
    const { customer_id, shop_id, barber_id, booking_id } = req.body;

    try {
      const queueEntry = await QueueService.joinQueue({
        customer_id,
        shop_id,
        barber_id,
        booking_id,
      });

      return res.status(201).json(queueEntry);
    } catch (error) {
      console.error("Controller error (join queue):", error);

      if (
        error instanceof Error &&
        error.message === "CUSTOMER_ALREADY_IN_QUEUE"
      ) {
        return res.status(409).json({
          message: "Customer is already in the queue",
        });
      }

      return res.status(500).json({
        message: "Failed to join queue",
      });
    }
  }

  // GET ALL QUEUE ENTRIES
  static async getAll(req: Request, res: Response) {
    try {
      const queue = await QueueService.getAll();

      return res.status(200).json(queue);
    } catch (error) {
      console.error("Controller error (get queue):", error);

      return res.status(500).json({
        message: "Failed to get queue",
      });
    }
  }

  // GET QUEUE ENTRY BY ID
  static async getById(req: Request, res: Response) {
    const queueId = Number(req.params.id);

    if (isNaN(queueId)) {
      return res.status(400).json({
        message: "Invalid queue id",
      });
    }

    try {
      const queueEntry = await QueueService.getById(queueId);

      if (!queueEntry) {
        return res.status(404).json({
          message: "Queue entry not found",
        });
      }

      return res.status(200).json(queueEntry);
    } catch (error) {
      console.error("Controller error (get queue entry):", error);

      return res.status(500).json({
        message: "Failed to get queue entry",
      });
    }
  }

  // GET TODAY'S QUEUE BY SHOP
  static async getByShopId(req: Request, res: Response) {
    const shopId = Number(req.params.shopId);

    if (isNaN(shopId)) {
      return res.status(400).json({
        message: "Invalid shop id",
      });
    }

    try {
      const queue = await QueueService.getByShopId(shopId);

      return res.status(200).json(queue);
    } catch (error) {
      console.error("Controller error (get shop queue):", error);

      return res.status(500).json({
        message: "Failed to get shop queue",
      });
    }
  }

  // GET CUSTOMER ACTIVE QUEUE
  static async getActiveByCustomerId(req: Request, res: Response) {
    const customerId = Number(req.params.customerId);

    const shopId = Number(req.params.shopId);

    if (isNaN(customerId) || isNaN(shopId)) {
      return res.status(400).json({
        message: "Invalid customer id or shop id",
      });
    }

    try {
      const queueEntry = await QueueService.getActiveByCustomerId(
        customerId,
        shopId,
      );

      if (!queueEntry) {
        return res.status(404).json({
          message: "Customer is not currently in the queue",
        });
      }

      return res.status(200).json(queueEntry);
    } catch (error) {
      console.error("Controller error (get customer queue):", error);

      return res.status(500).json({
        message: "Failed to get customer queue entry",
      });
    }
  }

  // GET NEXT WAITING CUSTOMER
  static async getNextWaiting(req: Request, res: Response) {
    const shopId = Number(req.params.shopId);

    if (isNaN(shopId)) {
      return res.status(400).json({
        message: "Invalid shop id",
      });
    }

    try {
      const queueEntry = await QueueService.getNextWaiting(shopId);

      if (!queueEntry) {
        return res.status(404).json({
          message: "No customers are currently waiting",
        });
      }

      return res.status(200).json(queueEntry);
    } catch (error) {
      console.error("Controller error (get next customer):", error);

      return res.status(500).json({
        message: "Failed to get next waiting customer",
      });
    }
  }

  // UPDATE QUEUE ENTRY
  static async update(req: Request, res: Response) {
    const queueId = Number(req.params.id);

    if (isNaN(queueId)) {
      return res.status(400).json({
        message: "Invalid queue id",
      });
    }

    const { status, barber_id } = req.body;

    try {
      const queueEntry = await QueueService.update(queueId, {
        status,
        barber_id,
      });

      if (!queueEntry) {
        return res.status(404).json({
          message: "Queue entry not found",
        });
      }

      return res.status(200).json(queueEntry);
    } catch (error) {
      console.error("Controller error (update queue):", error);

      return res.status(500).json({
        message: "Failed to update queue entry",
      });
    }
  }

  // DELETE QUEUE ENTRY
  static async deleteById(req: Request, res: Response) {
    const queueId = Number(req.params.id);

    if (isNaN(queueId)) {
      return res.status(400).json({
        message: "Invalid queue id",
      });
    }

    try {
      const queueEntry = await QueueService.deleteById(queueId);

      if (!queueEntry) {
        return res.status(404).json({
          message: "Queue entry not found",
        });
      }

      return res.status(200).json({
        message: "Queue entry deleted successfully",
        queueEntry,
      });
    } catch (error) {
      console.error("Controller error (delete queue):", error);

      return res.status(500).json({
        message: "Failed to delete queue entry",
      });
    }
  }
}
