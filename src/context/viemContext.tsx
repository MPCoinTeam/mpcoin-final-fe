import { CHAINS } from '@/common/constants/Assets';
import { Token } from '@/domain/interfaces/assets';
import { Transaction } from '@/domain/interfaces/transaction';
import { TransactionStatus } from '@/types/transaction';
import { toFormattedDate } from '@/utils/formatters';
import { createContext, useContext, useMemo } from 'react';
import { Address, Chain, PublicClient, createPublicClient, erc20Abi, formatEther, formatUnits, http } from 'viem';

interface ViemContextType {
  publicClient: PublicClient;
  currentChain: Chain;
  fetchTransactionReceipts: (chainId: number, address: Address, txns: { hash: string; timestamp: string }[]) => Promise<Transaction[]>;
  fetchTokenBalance: (chainId: number, walletAddress: Address, token: Token) => Promise<{ token: Token; balance: string }>;
  calculateGasFee: (chainId: number, fromAddress: Address, toAddress: Address, amount: string) => Promise<string>;
}

// Default configuration
const DEFAULT_CHAIN = CHAINS[0];
const DEFAULT_PUBLIC_CLIENT = createPublicClient({
  chain: DEFAULT_CHAIN,
  transport: http('https://endpoints.omniatech.io/v1/eth/sepolia/public'),
});

const viemContext = createContext<ViemContextType>({
  publicClient: DEFAULT_PUBLIC_CLIENT,
  currentChain: DEFAULT_CHAIN,
  fetchTransactionReceipts: async () => [],
  fetchTokenBalance: async () => ({ token: {} as Token, balance: '0' }),
  calculateGasFee: async () => '0',
});

export const useViem = () => useContext(viemContext);

export const ViemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const publicClient = useMemo(() => createPublicClient({ chain: DEFAULT_CHAIN, transport: http() }), []);

  const handleError = (error: any, message: string) => {
    console.warn(`[${message}] Error:`, error);
    return null;
  };

  const fetchTokenBalance = async (chainId: number, walletAddress: Address, token: Token): Promise<{ token: Token; balance: string }> => {
    try {
      const isNativeToken = token.symbol === 'ETH';
      const rawBalance = isNativeToken
        ? await publicClient.getBalance({ address: walletAddress })
        : await publicClient.readContract({
            address: token.contractAddress as Address,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [walletAddress],
          });

      return {
        token,
        balance: formatUnits(rawBalance as bigint, token.decimals),
      };
    } catch (error) {
      return handleError(error, `fetchTokenBalance for ${token.symbol}`) || { token, balance: '0' };
    }
  };

  const fetchTransactionReceipts = async (chainId: number, address: Address, txns: { hash: string; timestamp: string }[]): Promise<Transaction[]> => {
    if (!txns?.length) return [];

    try {
      const receipts = await Promise.all(
        txns.map((tx) =>
          publicClient.getTransactionReceipt({
            hash: tx.hash.startsWith('0x') ? (tx.hash as Address) : `0x${tx.hash}`,
          }),
        ),
      );

      return receipts.map((receipt, index) => ({
        id: Number(receipt.transactionIndex),
        type: receipt.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received',
        amount: formatEther(receipt.effectiveGasPrice * receipt.gasUsed),
        token: 'ETH',
        date: txns[index].timestamp.split(',')[0],
        status: receipt.status === 'success' ? 'Confirmed' : ('Failed' as TransactionStatus),
        txHash: receipt.transactionHash,
        from: receipt.from as Address,
        to: receipt.to as Address,
        gasLimit: receipt.gasUsed.toString(),
        gasPrice: formatUnits(receipt.effectiveGasPrice, 9),
        nonce: receipt.transactionIndex.toString(),
        timestamp: toFormattedDate(txns[index].timestamp),
        network: DEFAULT_CHAIN.name,
      }));
    } catch (error) {
      return handleError(error, 'fetchTransactionReceipts') || [];
    }
  };

  const calculateGasFee = async (chainId: number, fromAddress: Address, toAddress: Address, amount: string): Promise<string> => {
    try {
      const valueInWei = BigInt((parseFloat(amount) * 10 ** 18).toFixed(0));

      const gas = await publicClient.estimateGas({
        to: toAddress,
        account: fromAddress,
        value: valueInWei,
      });

      const gasPrice = await publicClient.getGasPrice(); // Gas price in Wei

      // Calculate the gas fee
      const gasFee = BigInt(gas) * BigInt(gasPrice); // gas and gasPrice are both in Wei
      const formattedGasFee = formatUnits(gasFee, 18); // Convert from Wei to ETH

      return formattedGasFee;
    } catch (error) {
      return handleError(error, 'calculateGasFee') || '0';
    }
  };

  const contextValue = useMemo(
    () => ({
      publicClient,
      currentChain: DEFAULT_CHAIN,
      fetchTransactionReceipts,
      fetchTokenBalance,
      calculateGasFee,
    }),
    [publicClient, fetchTransactionReceipts, fetchTokenBalance],
  );

  return <viemContext.Provider value={contextValue}>{children}</viemContext.Provider>;
};
