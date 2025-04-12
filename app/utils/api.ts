import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens, ApiResponse, ApiError, AuthResponse, User, Service, Event, Booking, EventRegistration, Category } from './types/api';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  console.error('API_URL is not defined in environment variables');
  throw new Error('API_URL is not defined in environment variables');
}

const TOKEN_STORAGE_KEY = 'authTokens';

export class ApiService {
  private static instance: ApiService;
  private baseUrl: string;
  private tokens: AuthTokens | null = null;
  private refreshPromise: Promise<AuthTokens> | null = null;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadTokens();
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(API_URL);
    }
    return ApiService.instance;
  }

  async initialize(): Promise<void> {
    await this.loadTokens();
  }

  private async loadTokens() {
    try {
      const tokens = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      if (tokens) {
        this.tokens = JSON.parse(tokens);
      }
    } catch (error) {
      console.error('Ошибка при загрузке токенов:', error);
    }
  }

  private async saveTokens(tokens: AuthTokens) {
    try {
      this.tokens = tokens;
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    } catch (error) {
      console.error('Ошибка при сохранении токенов:', error);
    }
  }

  async clearTokens() {
    try {
      this.tokens = null;
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Ошибка при удалении токенов:', error);
    }
  }

  private async refreshTokens(): Promise<AuthTokens> {
    if (!this.tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.tokens.refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      const newTokens: AuthTokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      this.saveTokens(newTokens);
      return newTokens;
    } catch (error) {
      await this.clearTokens();
      throw error;
    }
  }

  private async getValidTokens(): Promise<AuthTokens> {
    if (!this.tokens) {
      throw new Error('No tokens available');
    }

    // If we're already refreshing tokens, wait for that to complete
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // Check if token is expired (you might want to add proper JWT expiration check)
    const isExpired = false; // Implement proper JWT expiration check

    if (isExpired) {
      this.refreshPromise = this.refreshTokens();
      try {
        const tokens = await this.refreshPromise;
        this.refreshPromise = null;
        return tokens;
      } catch (error) {
        this.refreshPromise = null;
        throw error;
      }
    }

    return this.tokens;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers = new Headers(options.headers);
    
    if (this.tokens?.accessToken) {
      headers.append('Authorization', `Bearer ${this.tokens.accessToken}`);
    }
    
    headers.append('Content-Type', 'application/json');

    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log('API_URL:', API_URL);
      console.log('Making request to:', url);
      console.log('With headers:', Object.fromEntries(headers.entries()));
      
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        return {
          data: null,
          ok: false,
          status: response.status,
          error: {
            message: 'Сервер вернул некорректный ответ',
            status: response.status,
          },
        };
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        return {
          data: null,
          ok: false,
          status: response.status,
          error: {
            message: data.message || 'Произошла ошибка',
            status: response.status,
          },
        };
      }

      return {
        data,
        ok: true,
        status: response.status,
      };
    } catch (error) {
      console.error('Request error:', error);
      return {
        data: null,
        ok: false,
        error: {
          message: 'Ошибка сети',
        },
      };
    }
  }

  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok && response.data?.tokens) {
      await this.saveTokens(response.data.tokens);
    }

    return response;
  }

  async register(name: string, email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok && response.data?.tokens) {
      await this.saveTokens(response.data.tokens);
    }

    return response;
  }

  async logout(): Promise<void> {
    await this.request<void>('/api/auth/logout', {
      method: 'POST',
    });

    await this.clearTokens();
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>('/api/profile');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async isAuthenticated(): Promise<boolean> {
    return (await this.request<boolean>('/api/protected')).ok;
  }

  async getServices(): Promise<ApiResponse<Service[]>> {
    return this.request<Service[]>('/api/services');
  }

  async getServiceById(id: string): Promise<ApiResponse<Service>> {
    return this.request<Service>(`/api/services/${id}`);
  }

  async getEvents(): Promise<ApiResponse<Event[]>> {
    return this.request<Event[]>('/api/events');
  }

  async getEventById(id: string): Promise<ApiResponse<Event>> {
    return this.request<Event>(`/api/events/${id}`);
  }

  async bookService(serviceId: string, date: string, time: string): Promise<ApiResponse<Booking>> {
    return this.request<Booking>('/api/bookings', {
      method: 'POST',
      body: JSON.stringify({ serviceId, date, time }),
    });
  }

  async registerForEvent(eventId: string): Promise<ApiResponse<EventRegistration>> {
    return this.request<EventRegistration>('/api/events/register', {
      method: 'POST',
      body: JSON.stringify({ eventId }),
    });
  }

  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    return this.request<{ url: string }>('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getServiceCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>('/api/categories/services');
  }

  async getEventCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>('/api/categories/events');
  }
}

export const apiService = ApiService.getInstance(); 