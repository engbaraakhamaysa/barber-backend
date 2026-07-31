export interface BookingSlot {
  id: number;
  barber_id: number;
  slot_time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBookingSlotInput {
  barber_id: number;
  slot_time: Date;
}

export interface UpdateBookingSlotInput {
  slot_time?: Date;
}
