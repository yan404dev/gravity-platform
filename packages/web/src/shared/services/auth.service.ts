import { User, LoginResponse } from '../entities/user.entity';
import { AuthFormData } from '../components/auth-sheet/auth.schema';
import { api } from './http.service';

export const authService = {
  async login(credentials: any): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    return data;
  },

  async register(payload: AuthFormData): Promise<User> {
    const { data } = await api.post<User>('/users/onboarding', payload);
    return data;
  },

  async me(): Promise<User> {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }
}
