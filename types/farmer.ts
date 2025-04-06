export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  farmerId: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface Farmer {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  imageUrl?: string;
  products: Product[];
}

export interface Order {
  id: string;
  userId: string;
  farmerId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  farmerId: string;
  farmerName: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
} 