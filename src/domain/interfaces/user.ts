import { UserWallet } from './wallet';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export class UserProfile {
  user: User;
  wallet: UserWallet;

  constructor(user: User, wallet: UserWallet) {
    this.user = user;
    this.wallet = new UserWallet(wallet);
  }

  public getUser(): User {
    return this.user;
  }

  public getWallet(): UserWallet {
    return this.wallet;
  }

  public getFullname(): string {
    return this.user.name;
  }

  public getAvatar(): string {
    return 'https://th.bing.com/th/id/OIP.WDpVibS9KhiPPMgQN2I1KAHaHa?rs=1&pid=ImgDetMain';
  }
}
