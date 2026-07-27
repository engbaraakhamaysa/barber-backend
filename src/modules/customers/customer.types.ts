export interface Customer {
  id: number;
  barber_id: number;
  name: string;
  phone: string;
  created_at: Date;
}

export interface CreateCustomerInput {
  barber_id: number;
  name: string;
  phone: string;
}
