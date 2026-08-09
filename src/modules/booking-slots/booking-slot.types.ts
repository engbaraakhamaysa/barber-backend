///////////////////////////////////////////
// BOOKING SLOT
// Represents a scheduled booking slot for a barber
// Includes slot information and timestamps
///////////////////////////////////////////
export interface BookingSlot {
  id: number;
  barber_id: number;
  slot_time: Date;
  created_at: Date;
  updated_at: Date;
}

///////////////////////////////////////////
// CREATE BOOKING SLOT INPUT
// Data required to create a new booking slot
// Associates the slot with a barber and time
///////////////////////////////////////////
export interface CreateBookingSlotInput {
  barber_id: number;
  slot_time: Date;
}

///////////////////////////////////////////
// UPDATE BOOKING SLOT INPUT
// Fields allowed when updating a booking slot
// Supports partial updates
///////////////////////////////////////////
export interface UpdateBookingSlotInput {
  slot_time?: Date;
}
