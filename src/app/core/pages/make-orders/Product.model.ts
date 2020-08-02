export interface IProduct {
  id: string;
  key?: string;
  name: string;
  category?: number;
  price: number;
  quantity?: number;
  active?: boolean;
  description?: string;
  uid?: string;
  categoryByname?: string;
  amount: number;
}