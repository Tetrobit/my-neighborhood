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
  error?: ApiError;
} 