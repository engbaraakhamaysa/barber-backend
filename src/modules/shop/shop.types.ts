export interface Shop {
  id: number;
  name: string;
  location: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateShopInput {
  name: string;
  location: string;
}

export interface UpdateShopInput {
  name?: string;
  location?: string;
  is_active?: boolean;
}
