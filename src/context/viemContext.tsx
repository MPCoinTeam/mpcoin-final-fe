import { CHAINS, TOKENS } from '@/common/constants/Assets';
import { BaseToken } from '@/domain/interfaces/assets';
import { Transaction } from '@/domain/interfaces/transaction';
import { createContext, useContext, useMemo } from 'react';
import { Address, PublicClient, createPublicClient, erc20Abi, formatEther, formatUnits, http } from 'viem';
import { sepolia } from 'viem/chains';

interface ViemContextType {
  publicClient: PublicClient;
  fetchTransactionReceipts: (chainId: number, address: Address, txns: { hash: string; timestamp: string }[]) => Promise<Transaction[]>;
  fetchTokenBalance: (chainId: number, walletAddress: Address, token: BaseToken) => Promise<{ token: BaseToken; balance: string }>;
}

// Default public client for Sepolia
const defaultPublicClient = createPublicClient({
  chain: sepolia,
  transport: http('https://endpoints.omniatech.io/v1/eth/sepolia/public'),
});

const viemContext = createContext<ViemContextType>({
  publicClient: defaultPublicClient,
  fetchTransactionReceipts: async () => [],
  fetchTokenBalance: async () => ({ token: TOKENS[0], balance: '0' }),
});

export const useViem = () => useContext(viemContext);

export const ViemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize the public client
  const publicClient = useMemo(
    () =>
      createPublicClient({
        chain: CHAINS[0],
        transport: http(),
      }),
    [],
  );

  // Fetch token balance
  const fetchTokenBalance = async (chainId: number, walletAddress: Address, token: BaseToken): Promise<{ token: BaseToken; balance: string }> => {
    try {
      console.log('token address: ', token.address);
      console.log('wallet address: ', walletAddress);
      const rawBalance =
        token.symbol === 'ETH'
          ? await publicClient.getBalance({ address: walletAddress })
          : await publicClient.readContract({
              address: token.address as Address,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [walletAddress],
            });

      const formattedBalance = formatUnits(rawBalance as bigint, token.decimals);
      return { token, balance: formattedBalance };
    } catch (error) {
      console.warn(`[fetchTokenBalance] Error for ${token.symbol}:`, error);
      return { token, balance: '0' };
    }
  };

  // Fetch transaction receipts
  const fetchTransactionReceipts = async (chainId: number, address: Address, txns: { hash: string; timestamp: string }[]): Promise<Transaction[]> => {
    try {
      // Early return if txns is undefined or empty
      if (!txns || txns.length === 0) {
        return [];
      }
      const receipts = await Promise.all(
        txns.map((tx) =>
          publicClient.getTransactionReceipt({
            hash: tx.hash.startsWith('0x') ? (tx.hash as Address) : (`0x${tx.hash}` as Address),
          }),
        ),
      );

      return receipts.map((receipt, index) => {
        const tx = txns[index];
        return {
          id: Number(receipt.transactionIndex),
          type: receipt.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received',
          amount: formatEther(receipt.effectiveGasPrice * receipt.gasUsed),
          token: 'ETH',
          date: tx.timestamp.split(',')[0],
          status: receipt.status === 'success' ? 'Confirmed' : 'Failed',
          txHash: receipt.transactionHash,
          from: receipt.from,
          to: receipt.to || '',
          gasLimit: receipt.gasUsed.toString(),
          gasPrice: formatUnits(receipt.effectiveGasPrice, 9),
          nonce: receipt.transactionIndex.toString(),
          timestamp: tx.timestamp,
          network: CHAINS[0].name,
        };
      });
    } catch (error) {
      console.error('[fetchTransactionReceipts] Error:', error);
      return [];
    }
  };

  // Memoized context value
  const value = useMemo(
    () => ({
      publicClient,
      fetchTransactionReceipts,
      fetchTokenBalance,
    }),
    [publicClient],
  );

  return <viemContext.Provider value={value}>{children}</viemContext.Provider>;
};
