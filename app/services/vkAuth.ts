import * as VKID from '@vkid/sdk';
import pkceChallenge from 'pkce-challenge';
import AsyncStorage from '@react-native-community/async-storage';

const VK_APP_ID = '52984994';
const REDIRECT_URL = 'https://oauth.vk.com/blank.html';

export interface VKUser {
  id: string;
  first_name: string;
  last_name: string;
  photo_max: string;
  email?: string;
}

class VKAuthService {
  private static instance: VKAuthService;
  private isInitialized: boolean = false;

  private constructor() {}

  static getInstance(): VKAuthService {
    if (!VKAuthService.instance) {
      VKAuthService.instance = new VKAuthService();
    }
    return VKAuthService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const { code_challenge } = await pkceChallenge();
      VKID.Config.init({
        app: VK_APP_ID,
        redirectUrl: REDIRECT_URL,
        responseMode: VKID.ConfigResponseMode.Callback,
        codeChallenge: code_challenge,
      });
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize VK SDK:', error);
      throw error;
    }
  }

  async login(): Promise<VKUser> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const { code_verifier } = await pkceChallenge();
      const floatingOneTap = new VKID.FloatingOneTap();
      
      return new Promise((resolve, reject) => {
        floatingOneTap.render({
          appName: 'WeLocal',
          showAlternativeLogin: true,
          oauthList: [VKID.OAuthName.VK],
        });

        floatingOneTap.on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, async (data) => {
          data.code_verifier = code_verifier;
          data.redirect_uri = REDIRECT_URL;
          await AsyncStorage.setItem('vk_token', data.access_token);
          floatingOneTap.close();
          resolve(data.user);
        });

        floatingOneTap.on(VKID.FloatingOneTapInternalEvents.NOT_AUTHORIZED, (error) => {
          floatingOneTap.close();
          reject(error);
        });
      });
    } catch (error) {
      console.error('VK login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('vk_token');
    } catch (error) {
      console.error('VK logout failed:', error);
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('vk_token');
      return !!token;
    } catch (error) {
      console.error('Failed to check VK login status:', error);
      return false;
    }
  }
}

export const vkAuth = VKAuthService.getInstance(); 