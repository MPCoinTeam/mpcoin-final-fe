import { erc20Abi } from '@/common/constants/abis/erc20';
import { useQuery } from '@tanstack/react-query';
import { Address, createPublicClient, formatUnits, http } from 'viem';
import { sepolia } from 'viem/chains';

// Define token interface
interface Token {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  logoURI: string;
  balanceInUSD?: string;
  price?: number;
  inflationRate?: number;
}

// Common ERC20 tokens on Sepolia (example)
const TOKENS: Omit<Token, 'balance' | 'balanceInUSD' | 'price' | 'inflationRate'>[] = [
  {
    address: '0x0000000000000000000000000000000000000000', // ETH
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  },
  {
    address: '0x779877A7B0D9E8603169DdbD7836e478b4624789', // LINK
    symbol: 'LINK',
    name: 'Chainlink',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
  },
  // Add more tokens as needed
];

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`),
});

const fetchTokenPrice = async (symbol: string): Promise<{ currentPrice: number; inflationRate: number }> => {
  try {
    const [currentResponse, klineResponse] = await Promise.all([
      fetch(`https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`),
      fetch(`https://www.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&limit=2`),
    ]);

    const currentData = await currentResponse.json();
    const klineData = await klineResponse.json();

    const currentPrice = parseFloat(currentData.price);
    const yesterdayPrice = parseFloat(klineData[0][4]);
    const inflationRate = ((currentPrice - yesterdayPrice) / yesterdayPrice) * 100;

    return {
      currentPrice,
      inflationRate: parseFloat(inflationRate.toFixed(2)),
    };
  } catch (err) {
    console.warn(`Error fetching price data for ${symbol}:`, err);
    return { currentPrice: 0, inflationRate: 0 };
  }
};

async function fetchTokenBalances(walletAddress: string) {
  if (!walletAddress) return [];

  const tokenPromises = TOKENS.map(async (token) => {
    try {
      const [priceData, balance] = await Promise.all([
        fetchTokenPrice(token.symbol),
        token.symbol === 'ETH'
          ? publicClient.getBalance({ address: walletAddress as `0x${string}` })
          : publicClient.readContract({
              address: token.address,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [walletAddress],
            }),
      ]);

      const formattedBalance = formatUnits(balance as bigint, token.decimals);
      const balanceNumber = parseFloat(formattedBalance);

      return {
        ...token,
        balance: formattedBalance,
        price: priceData.currentPrice,
        inflationRate: priceData.inflationRate,
        balanceInUSD: (balanceNumber * priceData.currentPrice).toFixed(2),
      };
    } catch (err) {
      console.warn(`Error fetching balance for ${token.symbol}:`, err);
      return {
        ...token,
        balance: '0',
        price: 0,
        inflationRate: 0,
        balanceInUSD: '0',
      };
    }
  });

  return Promise.all(tokenPromises);
}

export function useTokenBalances(walletAddress?: string) {
  return useQuery({
    queryKey: ['tokenBalances', walletAddress],
    queryFn: () => fetchTokenBalances(walletAddress!),
    enabled: !!walletAddress,
    staleTime: 30_000, // Consider data fresh for 30 seconds
    refetchInterval: 30_000, // Auto refresh every 30 seconds
  });
}
