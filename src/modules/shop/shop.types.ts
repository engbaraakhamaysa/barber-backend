export interface Shop {
  id: number;
  name: string;
  location: string;
}

export interface CreateShopInput {
  name: string;
  location: string;
}
