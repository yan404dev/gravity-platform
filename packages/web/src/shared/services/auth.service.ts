import { User, LoginResponse } from '../entities/user.entity';
import { AuthFormData, LoginFormData, RegisterFormData } from '../components/auth-sheet/auth.schema';
import { api } from './http.service';
import { storageService } from './storage.service';

export const authService = {
  async login(credentials: LoginFormData): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    if (data.accessToken) {
      storageService.setToken(data.accessToken);
    }
    if (data.refreshToken) {
      storageService.setRefreshToken(data.refreshToken);
    }
    return data;
  },

  async register(payload: RegisterFormData): Promise<User> {
    const { data } = await api.post<User>('/users/onboarding', payload);
    return data;
  },

  async me(): Promise<User> {
    const { data } = await api.get<User>('/users/@me');
    return data;
  },

  async logout(): Promise<void> {
    storageService.removeToken();
  }
}
