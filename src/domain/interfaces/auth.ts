import { UserWallet } from './wallet';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  profile: User;
  wallet: UserWallet;
  access_token: string;
  refresh_token: string;
}

export interface ProfileResponse {
  profile: User;
  wallet: UserWallet;
}
