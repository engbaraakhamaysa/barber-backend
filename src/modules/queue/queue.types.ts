///////////////////////////////////////////
// QUEUE STATUS
// Define allowed queue states in the system
// Prevent invalid status values using union type
///////////////////////////////////////////
export type QueueStatus =
  | "waiting"
  | "called"
  | "in_service"
  | "completed"
  | "cancelled";

///////////////////////////////////////////
// QUEUE ENTRY MODEL
// Represents a customer's queue entry
// Includes queue status and lifecycle timestamps
///////////////////////////////////////////
export interface QueueEntry {
  id: number;
  barber_id: number;
  customer_id: number;
  status: QueueStatus;
  joined_at: string;
  called_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
}

///////////////////////////////////////////
// JOIN QUEUE INPUT
// Data required when adding a customer to queue
///////////////////////////////////////////
export interface JoinQueueInput {
  barber_id: number;
  customer_id: number;
}

///////////////////////////////////////////
// UPDATE QUEUE INPUT
// Fields allowed for queue entry updates
// Supports partial updates with optional fields
///////////////////////////////////////////
export interface UpdateQueueInput {
  status?: QueueStatus;
  barber_id?: number;
}
