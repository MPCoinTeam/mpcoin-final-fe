import { User } from './user';
import { Wallet } from './wallet';

export interface Profile {
  user: User;
  wallet: Wallet;
}
