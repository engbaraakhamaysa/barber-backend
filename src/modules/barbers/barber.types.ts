export interface Barber {
  id: number;
  shop_id: number;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  created_at: Date;
}

export interface BarberResponse {
  id: number;
  shop_id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: Date;
}

export interface CreateBarberInput {
  shop_id: number;
  name: string;
  email: string;
  password: string;
}

//???
export interface UpdateBarberInput {
  name: string;
  email: string;
  password: string;
  is_active: boolean;
}

export interface LoginBarberInput {
  email: string;
  password: string;
}
