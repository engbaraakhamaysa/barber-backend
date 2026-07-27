export interface BookingSlot {
  id: number;
  barber_id: number;
  slot_time: Date;
  is_booked: boolean;
  customer_name: string | null;
  customer_phone: string | null;
}

export interface CreateBookingSlotsInput {
  barber_id: number;
  slots: string[];
}

export interface BookSlotInput {
  slot_id: number;
  customer_name: string;
  customer_phone?: string;
}
