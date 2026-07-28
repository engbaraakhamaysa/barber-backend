import { Request, Response } from "express";
import { CustomerBarberBlockService } from "./customer-barber-block.service";

export class CustomerBarberBlockController {
  // CREATE BLOCK
  static async create(req: Request, res: Response) {
    const { customer_id, barber_id, reason } = req.body;

    try {
      const block = await CustomerBarberBlockService.create({
        customer_id,
        barber_id,
        reason,
      });

      return res.status(201).json(block);
    } catch (error) {
      console.error("Controller error (create customer barber block):", error);

      if (
        error instanceof Error &&
        error.message === "CUSTOMER_ALREADY_BLOCKED_BY_BARBER"
      ) {
        return res.status(409).json({
          message: "Customer is already blocked by this barber",
        });
      }

      return res.status(500).json({
        message: "Failed to block customer",
      });
    }
  }

  // GET BLOCK BY ID
  static async getById(req: Request, res: Response) {
    const blockId = Number(req.params.id);

    if (isNaN(blockId)) {
      return res.status(400).json({
        message: "Invalid block id",
      });
    }

    try {
      const block = await CustomerBarberBlockService.getById(blockId);

      if (!block) {
        return res.status(404).json({
          message: "Customer barber block not found",
        });
      }

      return res.status(200).json(block);
    } catch (error) {
      console.error("Controller error (get block):", error);

      return res.status(500).json({
        message: "Failed to get customer barber block",
      });
    }
  }

  // GET ACTIVE BLOCKS BY BARBER
  static async getActiveByBarberId(req: Request, res: Response) {
    const barberId = Number(req.params.barberId);

    if (isNaN(barberId)) {
      return res.status(400).json({
        message: "Invalid barber id",
      });
    }

    try {
      const blocks =
        await CustomerBarberBlockService.getActiveByBarberId(barberId);

      return res.status(200).json(blocks);
    } catch (error) {
      console.error("Controller error (get barber blocks):", error);

      return res.status(500).json({
        message: "Failed to get barber blocks",
      });
    }
  }

  // GET ACTIVE BLOCKS BY CUSTOMER
  static async getActiveByCustomerId(req: Request, res: Response) {
    const customerId = Number(req.params.customerId);

    if (isNaN(customerId)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    try {
      const blocks =
        await CustomerBarberBlockService.getActiveByCustomerId(customerId);

      return res.status(200).json(blocks);
    } catch (error) {
      console.error("Controller error (get customer blocks):", error);

      return res.status(500).json({
        message: "Failed to get customer blocks",
      });
    }
  }

  // UNBLOCK CUSTOMER
  static async unblock(req: Request, res: Response) {
    const blockId = Number(req.params.id);

    if (isNaN(blockId)) {
      return res.status(400).json({
        message: "Invalid block id",
      });
    }

    try {
      const block = await CustomerBarberBlockService.unblock(blockId);

      if (!block) {
        return res.status(404).json({
          message: "Active block not found",
        });
      }

      return res.status(200).json({
        message: "Customer unblocked successfully",
        block,
      });
    } catch (error) {
      console.error("Controller error (unblock customer):", error);

      return res.status(500).json({
        message: "Failed to unblock customer",
      });
    }
  }

  // DELETE BLOCK RECORD
  static async deleteById(req: Request, res: Response) {
    const blockId = Number(req.params.id);

    if (isNaN(blockId)) {
      return res.status(400).json({
        message: "Invalid block id",
      });
    }

    try {
      const block = await CustomerBarberBlockService.deleteById(blockId);

      if (!block) {
        return res.status(404).json({
          message: "Customer barber block not found",
        });
      }

      return res.status(200).json({
        message: "Block record deleted successfully",
        block,
      });
    } catch (error) {
      console.error("Controller error (delete block):", error);

      return res.status(500).json({
        message: "Failed to delete block record",
      });
    }
  }
}
