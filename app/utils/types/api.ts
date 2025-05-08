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
  age?: number;
  interests?: string[];
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
  description: string;
  price: number;
  schedule: Array<{
    day: string;
    time: string[];
  }>;
  image: string;
  address: string;
  phone: string;
  trainer: string;
  level: string;
  minAge: number;
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

export interface KidsClub {
  id: string;
  name: string;
  description: string;
  price: number;
  schedule: Array<{
    day: string;
    time: string[];
  }>;
  image: string;
  address: string;
  phone: string;
  contactPerson: string;
  minAge: number;
  maxAge: number;
  category: string; // например, "Творчество", "Наука", "Танцы" и т.д.
}

export interface KidsClubOrganization {
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
  clubs: KidsClub[];
  description: string;
  photos: string[];
}