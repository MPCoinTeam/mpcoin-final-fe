interface User {
  user_id: string;
  email: string;
  avatar: string;
  wallet_address: string;
  wallet_id: string;
  name: string;
}

export default class UserInfo implements User {
  user_id: string;
  email: string;
  avatar: string;
  wallet_address: string;
  wallet_id: string;
  name: string;
  constructor(user: User) {
    this.avatar = user.avatar;
    this.wallet_address = user.wallet_address;
    this.name = user.name;
    this.user_id = user.user_id;
    this.email = user.email;
    this.wallet_id = user.wallet_id;
  }
  getTruncatedAddress(): string {
    return `${this.wallet_address.slice(0, 6)}...${this.wallet_address.slice(38)}`;
  }
  getFullname(): string {
    return this.name;
  }
}
