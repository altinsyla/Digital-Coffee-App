
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "coffee" | "pastry" | "drink" | "seasonal" | "wholesale";
  image?: string;
  custom?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}
