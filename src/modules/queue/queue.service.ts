import { QueueRepository } from "./queue.repository";
import { QueueEntry, JoinQueueInput, UpdateQueueInput } from "./queue.types";

export class QueueService {
  // JOIN QUEUE
  static async joinQueue(data: JoinQueueInput): Promise<QueueEntry> {
    // Prevent the same customer from
    // joining the same shop queue twice
    const existingEntry = await QueueRepository.getActiveByCustomerId(
      data.customer_id,
      data.shop_id,
    );

    if (existingEntry) {
      throw new Error("CUSTOMER_ALREADY_IN_QUEUE");
    }

    return QueueRepository.joinQueue(data);
  }

  // GET ALL QUEUE ENTRIES
  static async getAll(): Promise<QueueEntry[]> {
    return QueueRepository.getAll();
  }

  // GET QUEUE ENTRY BY ID
  static async getById(id: number): Promise<QueueEntry | undefined> {
    return QueueRepository.getById(id);
  }

  // GET TODAY'S QUEUE BY SHOP
  static async getByShopId(shopId: number): Promise<QueueEntry[]> {
    return QueueRepository.getByShopId(shopId);
  }

  // GET CUSTOMER ACTIVE QUEUE ENTRY
  static async getActiveByCustomerId(
    customerId: number,
    shopId: number,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.getActiveByCustomerId(customerId, shopId);
  }

  // GET NEXT WAITING CUSTOMER
  static async getNextWaiting(shopId: number): Promise<QueueEntry | undefined> {
    return QueueRepository.getNextWaiting(shopId);
  }

  // UPDATE QUEUE ENTRY
  static async update(
    id: number,
    data: UpdateQueueInput,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.update(id, data);
  }

  // DELETE QUEUE ENTRY
  static async deleteById(id: number): Promise<QueueEntry | undefined> {
    return QueueRepository.deleteById(id);
  }
}
