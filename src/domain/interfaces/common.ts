interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  wallets: Wallet[];
}

interface Wallet {
  id: string;
  user_id: string;
  wallet_address: string;
  chain_id: number;
  tokens: TokenBalance[];
}

interface Token {
  id: string;
  symbol: string;
  name: string;
  icon: string;
}

interface TokenBalance {
  token: Token;
  balance: string;
  usd_balance: number;
  inflation_rate: number;
}

interface Transaction {
  id: string;
  wallet_id: string;
  amount: string;
  type: string;
  created_at: string;
}

interface TransactionDetail {
  transaction: Transaction;
  token: Token;
}
