export interface Barber {
  id: number;
  shop_id: number;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  created_at?: Date;
}
