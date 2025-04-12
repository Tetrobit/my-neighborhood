import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from './api';
import { AuthTokens, AuthResponse, ApiResponse } from './types/api';

const TOKEN_STORAGE_KEY = 'authTokens';

export class AuthService {
  private static instance: AuthService;
  private api: ApiService;
  private tokens: AuthTokens | null = null;

  private constructor() {
    this.api = ApiService.getInstance();
    this.loadTokens();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
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

  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.api.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok && response.data?.tokens) {
      await this.saveTokens(response.data.tokens);
    } else {
      console.error('Login failed or no tokens in response');
    }

    return response;
  }

  async register(name: string, email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.api.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    console.log('Register response:', response);

    if (response.ok && response.data?.tokens) {
      console.log('Saving tokens:', response.data.tokens);
      await this.saveTokens(response.data.tokens);
    } else {
      console.error('Registration failed or no tokens in response');
    }

    return response;
  }

  async logout(): Promise<void> {
    await this.api.request<void>('/auth/logout', {
      method: 'POST',
    });
    await this.clearTokens();
  }

  async refreshToken(): Promise<ApiResponse<AuthTokens>> {
    if (!this.tokens?.refreshToken) {
      return {
        data: null,
        ok: false,
        error: { message: 'Нет refresh токена' },
      };
    }

    const response = await this.api.request<AuthTokens>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: this.tokens.refreshToken }),
    });

    if (response.ok && response.data) {
      await this.saveTokens(response.data);
    }

    return response;
  }

  getAccessToken(): string | null {
    return this.tokens?.accessToken || null;
  }

  isAuthenticated(): boolean {
    return !!this.tokens?.accessToken;
  }
} 