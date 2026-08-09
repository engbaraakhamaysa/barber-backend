///////////////////////////////////////////
// CUSTOMER MODEL
// Represents complete customer data from database
// user_id can be null for customers without an account
///////////////////////////////////////////
export interface Customer {
  id: number;
  user_id: number | null;
  name: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

///////////////////////////////////////////
// CREATE CUSTOMER INPUT
// Data required when creating a customer
// user_id and phone are optional
///////////////////////////////////////////
export interface CreateCustomerInput {
  name: string;
  phone?: string | null;
  user_id?: number | null;
}

///////////////////////////////////////////
// UPDATE CUSTOMER INPUT
// Fields allowed when updating a customer
// All fields are optional to support partial updates
///////////////////////////////////////////
export interface UpdateCustomerInput {
  name?: string;
  phone?: string | null;
}

///////////////////////////////////////////
// CUSTOMER RESPONSE
// Data returned to the client
// Represents the public customer information
///////////////////////////////////////////
export interface CustomerResponse {
  id: number;
  user_id: number | null;
  name: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}
