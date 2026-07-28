export type QueueStatus = "waiting" | "in_service" | "completed" | "cancelled";

export interface QueueEntry {
  id: number;
  customer_id: number;
  shop_id: number;
  barber_id: number | null;
  booking_id: number | null;
  status: QueueStatus;
  queue_number: number;
  joined_at: Date;
  started_at: Date | null;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface JoinQueueInput {
  customer_id: number;
  shop_id: number;
  barber_id?: number | null;
  booking_id?: number | null;
}

export interface UpdateQueueInput {
  status?: QueueStatus;
  barber_id?: number | null;
}
