import { DEFAULT_CHAIN_ID } from '@/common/constants/Assets';

export class UserWallet {
  id: string;
  user_id: string;
  address: string;
  chain_id: number;

  constructor(wallet: UserWallet) {
    this.id = wallet.id;
    this.user_id = wallet.user_id;
    this.address = wallet.address;
    this.chain_id = wallet.chain_id ?? DEFAULT_CHAIN_ID;
  }

  public getAddress(): string {
    return this.address;
  }

  public getTruncatedAddress(): string {
    if (!this.address) return '';
    return `${this.address.slice(0, 6)}...${this.address.slice(38)}`;
  }

  public getChainId(): number {
    return this.chain_id;
  }
}
