import { User } from './user';
import { Wallet } from './wallet';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  wallet: Wallet;
  accessToken: string;
  refreshToken: string;
}
