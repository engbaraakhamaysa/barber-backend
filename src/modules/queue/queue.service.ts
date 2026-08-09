import { QueueRepository } from "./queue.repository";
import { QueueEntry, JoinQueueInput, UpdateQueueInput } from "./queue.types";

export class QueueService {
  ///////////////////////////////////////////
  // JOIN QUEUE
  // Check if customer already has an active queue entry
  // Add customer to queue if no active entry exists
  ///////////////////////////////////////////
  static async joinQueue(data: JoinQueueInput): Promise<QueueEntry> {
    const existingEntry = await QueueRepository.getActiveByCustomerId(
      data.customer_id,
    );

    if (existingEntry) {
      throw new Error("CUSTOMER_ALREADY_IN_QUEUE");
    }

    return QueueRepository.joinQueue(data);
  }

  ///////////////////////////////////////////
  // GET ALL QUEUE ENTRIES
  // Return all queue entries
  ///////////////////////////////////////////
  static async getAll(): Promise<QueueEntry[]> {
    return QueueRepository.getAll();
  }

  ///////////////////////////////////////////
  // GET QUEUE ENTRY BY ID
  // Find queue entry using unique queue id
  ///////////////////////////////////////////
  static async getById(id: number): Promise<QueueEntry | undefined> {
    return QueueRepository.getById(id);
  }

  ///////////////////////////////////////////
  // GET QUEUE BY BARBER
  // Return active queue entries for a barber
  ///////////////////////////////////////////
  static async getByBarberId(barberId: number): Promise<QueueEntry[]> {
    return QueueRepository.getByBarberId(barberId);
  }

  ///////////////////////////////////////////
  // GET CUSTOMER ACTIVE QUEUE
  // Return customer's current active queue entry
  ///////////////////////////////////////////
  static async getActiveByCustomerId(
    customerId: number,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.getActiveByCustomerId(customerId);
  }

  ///////////////////////////////////////////
  // GET NEXT WAITING CUSTOMER
  // Return the first waiting customer for a barber
  ///////////////////////////////////////////
  static async getNextWaiting(
    barberId: number,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.getNextWaiting(barberId);
  }

  ///////////////////////////////////////////
  // UPDATE QUEUE ENTRY
  // Update queue status or assigned barber
  // Return updated queue entry
  ///////////////////////////////////////////
  static async update(
    id: number,
    data: UpdateQueueInput,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.update(id, data);
  }

  ///////////////////////////////////////////
  // DELETE QUEUE ENTRY
  // Remove queue entry permanently
  ///////////////////////////////////////////
  static async deleteById(id: number): Promise<QueueEntry | undefined> {
    return QueueRepository.deleteById(id);
  }
}
