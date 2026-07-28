export interface Customer {
  id: number;
  user_id: number | null;
  name: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCustomerInput {
  name: string;
  phone?: string | null;
  user_id?: number | null;
}

export interface UpdateCustomerInput {
  name?: string;
  phone?: string | null;
}

export interface CustomerResponse {
  id: number;
  user_id: number | null;
  name: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}
