import type { UserRole } from "../users/user.types";

///////////////////////////////////////////
// AUTH USER
// Safe user data returned to client
// Password is never exposed
///////////////////////////////////////////
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

///////////////////////////////////////////
// REGISTER INPUT
// Data required for creating account
// Role is assigned internally
///////////////////////////////////////////
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

///////////////////////////////////////////
// LOGIN INPUT
// Credentials used for authentication
///////////////////////////////////////////
export interface LoginInput {
  email: string;
  password: string;
}

///////////////////////////////////////////
// AUTH RESPONSE
// Response after successful login
///////////////////////////////////////////
export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

///////////////////////////////////////////
// AUTH USER RECORD
// Internal database data
// Password is used only for verification
///////////////////////////////////////////
// export interface AuthUserRecord extends AuthUser {
//   password: string;
//   is_active: boolean;
// }
