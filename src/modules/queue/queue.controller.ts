import { Request, Response } from "express";

import { QueueService } from "./queue.service";

export class QueueController {
  ///////////////////////////////////////////
  // JOIN QUEUE
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
  // COMPLETE CURRENT CUSTOMER
  ///////////////////////////////////////////

  static async completeCustomer(req: Request, res: Response) {
    const queueId = Number(req.params.id);

    if (isNaN(queueId)) {
      return res.status(400).json({
        message: "Invalid queue id",
      });
    }

    try {
      const nextCustomer = await QueueService.completeCustomer(queueId);

      return res.status(200).json({
        message: "Customer completed successfully",
        nextCustomer: nextCustomer ?? null,
      });
    } catch (error) {
      console.error("Controller error (complete customer):", error);

      return res.status(500).json({
        message: "Failed to complete customer",
      });
    }
  }

  ///////////////////////////////////////////
  // UPDATE QUEUE
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
