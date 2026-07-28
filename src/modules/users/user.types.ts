export type UserRole = "admin" | "barber" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
}
