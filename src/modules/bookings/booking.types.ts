// export type BookingStatus =
//   | "pending"
//   | "confirmed"
//   | "cancelled"
//   | "completed"
//   | "no_show";

// ///////////////////////////////////////////
// // BOOKING
// // Represents a customer booking
// // Links a customer to a booking slot
// ///////////////////////////////////////////
// export interface Booking {
//   id: number;
//   customer_id: number;
//   slot_id: number;
//   status: BookingStatus;
//   created_at: Date;
//   updated_at: Date;
// }

// ///////////////////////////////////////////
// // CREATE BOOKING INPUT
// // Data required to create a booking
// ///////////////////////////////////////////
// export interface CreateBookingInput {
//   customer_id: number;
//   slot_id: number;
// }

// ///////////////////////////////////////////
// // UPDATE BOOKING INPUT
// // Optional booking fields that can be updated
// ///////////////////////////////////////////
// export interface UpdateBookingInput {
//   status?: BookingStatus;
// }

// ///////////////////////////////////////////
// // BOOKING WITH DETAILS
// // Booking data combined with customer,
// // barber, and shop information
// // Used when returning detailed booking data
// ///////////////////////////////////////////
// export interface BookingWithDetails extends Booking {
//   customer_name: string;
//   customer_phone: string | null;

//   barber_name: string;
//   shop_name: string;

//   start_time: Date;
//   end_time: Date;
// }

export type BookingStatus =
  | "confirmed"
  | "cancelled"
  | "completed"
  | "pending"
  | "no_show";

///////////////////////////////////////////
// BOOKING
// Represents a customer booking
// Links a customer to a booking slot
///////////////////////////////////////////
export interface Booking {
  id: number;
  customer_id: number;
  slot_id: number;
  status: BookingStatus;
  created_at: Date;
  updated_at: Date;
}

///////////////////////////////////////////
// CREATE BOOKING INPUT
// Data required to create a booking
///////////////////////////////////////////
export interface CreateBookingInput {
  customer_id: number;
  slot_id: number;
}

///////////////////////////////////////////
// UPDATE BOOKING INPUT
// Optional booking fields that can be updated
///////////////////////////////////////////
export interface UpdateBookingInput {
  status?: BookingStatus;
}

///////////////////////////////////////////
// BOOKING WITH DETAILS
// Booking data combined with customer,
// barber, and booking slot information
// Used when returning detailed booking data
///////////////////////////////////////////
export interface BookingWithDetails extends Booking {
  customer_name: string;
  customer_phone: string | null;

  barber_name: string;

  slot_time: Date;
}
