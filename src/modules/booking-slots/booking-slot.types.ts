export interface BookingSlot {
  id: number;
  shop_id: number;
  barber_id: number;
  start_time: Date;
  end_time: Date;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBookingSlotInput {
  shop_id: number;
  barber_id: number;
  start_time: Date;
  end_time: Date;
}

export interface UpdateBookingSlotInput {
  start_time?: Date;
  end_time?: Date;
  is_available?: boolean;
}
