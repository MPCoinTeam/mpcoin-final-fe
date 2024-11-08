interface User {
  avatar: string;
  address: string;
  name: string;
  network: string;
}

export default class UserInfo implements User {
  avatar: string;
  address: string;
  name: string;
  network: string;
  constructor(user: User) {
    this.avatar = user.avatar;
    this.address = user.address;
    this.name = user.name;
    this.network = user.network;
  }
  getUsername(): string {
    return `${this.address.slice(0, 6)}...${this.address.slice(38)}`;
  }
  getFullname(): string {
    return this.name;
  }
}
