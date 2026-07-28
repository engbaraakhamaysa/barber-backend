import { UserRole } from "../users/user.types";

export interface Barber {
  id: number;
  user_id: number;
  shop_id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BarberWithUser extends Barber {
  name: string;
  email: string;
  role: UserRole;
}

export interface CreateBarberInput {
  shop_id: number;
  name: string;
  email: string;
  password: string;
}

export interface UpdateBarberInput {
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
}
