import { Request, Response } from "express";
import { QueueService } from "./queue.service";

export class QueueController {
  ///////////////////////////////////////////
  // JOIN QUEUE
  // Receive customer and barber data
  // Add customer to queue
  ///////////////////////////////////////////
  static async joinQueue(req: Request, res: Response) {
    const { customer_id, barber_id } = req.body;

    try {
      const queueEntry = await QueueService.joinQueue({
        customer_id,
        barber_id,
      });

      return res.status(201).json(queueEntry);
    } catch (error) {
      console.error("Controller error (join queue):", error);

      ///////////////////////////////////////////
      // Customer already has an active queue entry
      ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET ALL QUEUE
  // Return all queue entries
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET QUEUE BY ID
  // Validate queue id from params
  // Return queue entry if exists
  ///////////////////////////////////////////
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

  ///////////////////////////////////////////
  // GET QUEUE BY BARBER
  // Validate barber id from params
  // Return active queue entries for barber
  ///////////////////////////////////////////
  static async getByBarberId(req: Request, res: Response) {
    const barberId = Number(req.params.barberId);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const queue = await QueueService.getByBarberId(barberId);

      return res.status(200).json(queue);
    } catch (error) {
      console.error("Controller error (get barber queue):", error);

      return res.status(500).json({
        message: "Failed to get barber queue",
      });
    }
  }

  ///////////////////////////////////////////
  // GET CUSTOMER ACTIVE QUEUE
  // Validate customer id from params
  // Return customer's active queue entry
  ///////////////////////////////////////////
  static async getActiveByCustomerId(req: Request, res: Response) {
    const customerId = Number(req.params.customerId);

    if (isNaN(customerId)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    try {
      const queueEntry = await QueueService.getActiveByCustomerId(customerId);

      if (!queueEntry) {
        return res.status(404).json({
          message: "Customer is not currently in queue",
        });
      }

      return res.status(200).json(queueEntry);
    } catch (error) {
      console.error("Controller error (customer queue):", error);

      return res.status(500).json({
        message: "Failed to get customer queue",
      });
    }
  }

  ///////////////////////////////////////////
  // GET NEXT WAITING CUSTOMER
  // Validate barber id from params
  // Return first waiting customer
  ///////////////////////////////////////////
  static async getNextWaiting(req: Request, res: Response) {
    const barberId = Number(req.params.barberId);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const queueEntry = await QueueService.getNextWaiting(barberId);

      if (!queueEntry) {
        return res.status(404).json({
          message: "No customers are waiting",
        });
      }

      return res.status(200).json(queueEntry);
    } catch (error) {
      console.error("Controller error (next customer):", error);

      return res.status(500).json({
        message: "Failed to get next customer",
      });
    }
  }

  ///////////////////////////////////////////
  // UPDATE QUEUE
  // Validate queue id and update queue data
  // Return updated queue entry
  ///////////////////////////////////////////
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
        message: "Failed to update queue",
      });
    }
  }

  ///////////////////////////////////////////
  // DELETE QUEUE
  // Validate queue id and remove queue entry
  // Return deletion result
  ///////////////////////////////////////////
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
