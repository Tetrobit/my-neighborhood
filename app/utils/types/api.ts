export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T | null;
  ok: boolean;
  status?: number;
  error?: ApiError;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  subcategory: string;
  category: string;
  workingHours: string;
  isAvailable: boolean;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  subcategory: string;
  category: string;
  date: string;
  time: string;
  price?: string;
  maxParticipants?: number;
  currentParticipants: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: 'registered' | 'cancelled';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'service' | 'event';
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
} 