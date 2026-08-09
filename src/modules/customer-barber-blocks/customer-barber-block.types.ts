///////////////////////////////////////////
// CUSTOMER-BARBER BLOCK
// Represents a block between a specific customer and barber
// Stores the block status, reason, and block/unblock timestamps
///////////////////////////////////////////
export interface CustomerBarberBlock {
  id: number;
  customer_id: number;
  barber_id: number;
  reason: string | null;
  is_active: boolean;
  blocked_at: Date;
  unblocked_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

///////////////////////////////////////////
// CREATE CUSTOMER-BARBER BLOCK INPUT
// Data required to block a customer from a specific barber
// Includes the customer, barber, and optional blocking reason
///////////////////////////////////////////
export interface CreateCustomerBarberBlockInput {
  customer_id: number;
  barber_id: number;
  reason?: string;
}

///////////////////////////////////////////
// UNBLOCK CUSTOMER-BARBER INPUT
// Data used when removing an active customer-barber block
// Stores the date and time when the customer is unblocked
///////////////////////////////////////////
export interface UnblockCustomerBarberInput {
  unblocked_at?: Date;
}
