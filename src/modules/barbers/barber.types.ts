import { UserRole } from "../users/user.types";

///////////////////////////////////////////
// BARBER MODEL
// Represents barber data from database
///////////////////////////////////////////
export interface Barber {
  id: number;
  user_id: number;
  shop_id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

///////////////////////////////////////////
// BARBER WITH USER
// Represents barber data with linked user information
// Includes name, email, and user role
///////////////////////////////////////////
export interface BarberWithUser extends Barber {
  name: string;
  email: string;
  role: UserRole;
}

///////////////////////////////////////////
// CREATE BARBER INPUT
// Data required when creating a new barber
// User role is assigned internally
///////////////////////////////////////////
export interface CreateBarberInput {
  shop_id: number;
  name: string;
  email: string;
  password: string;
}

///////////////////////////////////////////
// UPDATE BARBER INPUT
// Fields allowed for barber updates
// Supports partial updates with optional fields
///////////////////////////////////////////
export interface UpdateBarberInput {
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
}
