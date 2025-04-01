import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = 'http://192.168.31.46:8088';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      await this.setToken(data.accessToken, data.refreshToken);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const responseData = await response.json();
      await this.setToken(responseData.accessToken, responseData.refreshToken);
      return responseData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.removeToken();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<AuthResponse['user'] | null> {
    // try {
    //   const token = await this.getToken();
    //   if (!token) return null;

    //   const response = await fetch(`${API_URL}/api/users/me`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to get user data');
    //   }

    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   console.error('Get user error:', error);
    //   return null;
    // }
    return {
      id: '1',
      email: 'test@test.com',
      name: 'Test User',
      avatar: 'https://via.placeholder.com/150',
    };
  }

  private async setToken(accessToken: string, refreshToken: string): Promise<void> {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    await SecureStore.setItemAsync('access_token', accessToken);
    await SecureStore.setItemAsync('refresh_token', refreshToken);
  }

  private async getToken(): Promise<string | null> {
    if (!this.accessToken) {
      this.accessToken = await SecureStore.getItemAsync('access_token');
    }
    return this.accessToken;
  }

  private async removeToken(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}

export const authService = AuthService.getInstance(); 