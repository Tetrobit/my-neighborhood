export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  profileImage?: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  ok: boolean;
  status: number | undefined;
  error?: ApiError;
}

export interface SportSection {
  id: string;
  name: string;
  price: number;
  description: string;
  schedule: Array<{
    day: string;
    time: string[];
  }>;
  trainer: string;
  level: string;
  minAge: number;
}

export interface SportOrganization {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  rating: number;
  workingHours: Array<{
    day: string;
    start: string;
    end: string;
  }>;
  sections: SportSection[];
  description: string;
  photos: string[];
} 