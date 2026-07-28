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

export interface CreateCustomerBarberBlockInput {
  customer_id: number;

  barber_id: number;

  reason?: string;
}

export interface UnblockCustomerBarberInput {
  unblocked_at?: Date;
}
