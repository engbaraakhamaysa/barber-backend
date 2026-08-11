import { QueueRepository } from "./queue.repository";

import { QueueEntry, JoinQueueInput, UpdateQueueInput } from "./queue.types";

export class QueueService {
  ///////////////////////////////////////////
  // JOIN QUEUE
  ///////////////////////////////////////////

  static async joinQueue(data: JoinQueueInput): Promise<QueueEntry> {
    const existingEntry = await QueueRepository.getActiveByCustomerId(
      data.customer_id,
    );

    if (existingEntry) {
      throw new Error("CUSTOMER_ALREADY_IN_QUEUE");
    }

    ///////////////////////////////////////////
    // CHECK CURRENT IN-SERVICE CUSTOMER
    ///////////////////////////////////////////

    const currentCustomer = await QueueRepository.getCurrentInService(
      data.barber_id,
    );

    ///////////////////////////////////////////
    // FIRST CUSTOMER
    ///////////////////////////////////////////

    if (!currentCustomer) {
      const queueEntry = await QueueRepository.joinQueue(data);

      return QueueRepository.update(queueEntry.id, {
        status: "in_service",
      }) as Promise<QueueEntry>;
    }

    ///////////////////////////////////////////
    // CUSTOMER AFTER CURRENT CUSTOMER
    ///////////////////////////////////////////

    return QueueRepository.joinQueue(data);
  }

  ///////////////////////////////////////////
  // GET ALL QUEUE ENTRIES
  ///////////////////////////////////////////

  static async getAll(): Promise<QueueEntry[]> {
    return QueueRepository.getAll();
  }

  ///////////////////////////////////////////
  // GET QUEUE ENTRY BY ID
  ///////////////////////////////////////////

  static async getById(id: number): Promise<QueueEntry | undefined> {
    return QueueRepository.getById(id);
  }

  ///////////////////////////////////////////
  // GET QUEUE BY BARBER
  ///////////////////////////////////////////

  static async getByBarberId(barberId: number): Promise<QueueEntry[]> {
    return QueueRepository.getByBarberId(barberId);
  }

  ///////////////////////////////////////////
  // GET CUSTOMER ACTIVE QUEUE
  ///////////////////////////////////////////

  static async getActiveByCustomerId(
    customerId: number,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.getActiveByCustomerId(customerId);
  }

  ///////////////////////////////////////////
  // GET NEXT WAITING CUSTOMER
  ///////////////////////////////////////////

  static async getNextWaiting(
    barberId: number,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.getNextWaiting(barberId);
  }

  ///////////////////////////////////////////
  // COMPLETE CURRENT CUSTOMER
  ///////////////////////////////////////////

  static async completeCustomer(
    queueId: number,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.completeCurrentCustomer(queueId);
  }

  ///////////////////////////////////////////
  // UPDATE QUEUE ENTRY
  ///////////////////////////////////////////

  static async update(
    id: number,
    data: UpdateQueueInput,
  ): Promise<QueueEntry | undefined> {
    return QueueRepository.update(id, data);
  }

  ///////////////////////////////////////////
  // DELETE QUEUE ENTRY
  ///////////////////////////////////////////

  static async deleteById(id: number): Promise<QueueEntry | undefined> {
    return QueueRepository.deleteById(id);
  }
}
