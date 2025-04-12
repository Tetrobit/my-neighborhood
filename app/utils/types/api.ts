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

export interface OrganizationInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  price: number;
  experience: number;
  rating: number;
  photo?: string;
  description?: string;
  schedule: Array<{
    day: string;
    time: string[];
  }>;
  organization?: OrganizationInfo | MedicalOrganization;
}

export interface MedicalOrganization {
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
  doctors: Doctor[];
  description?: string;
  photos?: string[];
} 