export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export interface Booking {
  id: number;
  customer_id: number;
  slot_id: number;
  status: BookingStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBookingInput {
  customer_id: number;
  slot_id: number;
}

export interface UpdateBookingInput {
  status?: BookingStatus;
}

export interface BookingWithDetails extends Booking {
  customer_name: string;
  customer_phone: string | null;

  barber_name: string;
  shop_name: string;

  start_time: Date;
  end_time: Date;
}
