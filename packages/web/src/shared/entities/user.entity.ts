export interface Profile {
  id: number;
  name: string;
  document: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface User {
  id: number;
  email: string;
  name: string
  active: boolean;
  settings: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  currentProfileId: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  type: string;
  currentProfile: Profile;
  user: User;
}
