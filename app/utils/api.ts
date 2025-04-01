import * as SecureStore from 'expo-secure-store';
import { AuthTokens, ApiResponse, ApiError, AuthResponse, User } from './types/api';

const API_URL = 'http://192.168.31.46:8088';
const TOKEN_STORAGE_ACCESS_TOKEN = 'access_token';
const TOKEN_STORAGE_REFRESH_TOKEN = 'refresh_token';

class ApiService {
  private static instance: ApiService;
  private tokens: AuthTokens | null = null;
  private refreshPromise: Promise<AuthTokens> | null = null;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async initialize(): Promise<void> {
    await this.loadTokens();
  }

  private async loadTokens(): Promise<void> {
    try {
      const accessToken = await SecureStore.getItemAsync(TOKEN_STORAGE_ACCESS_TOKEN);
      const refreshToken = await SecureStore.getItemAsync(TOKEN_STORAGE_REFRESH_TOKEN);
      if (accessToken && refreshToken) {
        this.tokens = {
          accessToken,
          refreshToken,
        };
      }
    } catch (error) {
      console.error('Error loading tokens:', error);
    }
  }

  private async saveTokens(tokens: AuthTokens): Promise<void> {
    try {
      this.tokens = tokens;
      await SecureStore.setItemAsync(TOKEN_STORAGE_ACCESS_TOKEN, tokens.accessToken);
      await SecureStore.setItemAsync(TOKEN_STORAGE_REFRESH_TOKEN, tokens.refreshToken);
    } catch (error) {
      console.error('Error saving tokens:', error);
    }
  }

  async clearTokens(): Promise<void> {
    try {
      this.tokens = null;
      await SecureStore.deleteItemAsync(TOKEN_STORAGE_ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(TOKEN_STORAGE_REFRESH_TOKEN);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  private async refreshTokens(): Promise<AuthTokens> {
    if (!this.tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
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

      await this.saveTokens(newTokens);
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
    options: RequestInit = {},
    withCredentials: boolean = true
  ): Promise<ApiResponse<T>> {
    try {
      if (withCredentials) {
        const tokens = await this.getValidTokens();
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${tokens.accessToken}`,
        };
      }

      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return { data };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: error instanceof Response ? error.status : undefined,
      };
      return { data: null as T, error: apiError };
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }, false);

    await this.saveTokens(response.data);

    return response;
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }, false);
  }

  async logout(): Promise<void> {
    await this.request<void>('/api/auth/logout', {
      method: 'POST',
    });

    await this.clearTokens()
  }

  // User endpoints
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/api/auth/me');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async isAuthenticated(): Promise<boolean> {
    return (await this.request<boolean>('/api/protected')).error ? false : true;
  }
}

export const apiService = ApiService.getInstance(); 