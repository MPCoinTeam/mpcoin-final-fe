import { Chain, createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;
// Map of supported chains
export const chains: Record<number, Chain> = {
  11155111: sepolia,
};

// Create a client for a specific chain
export const getPublicClient = (chainId: number) => {
  const chain = chains[chainId];
  if (!chain) throw new Error(`Unsupported chain ID: ${chainId}`);

  return createPublicClient({
    chain,
    // transport: http(`https://${chain.name.toLowerCase()}.infura.io/v3/${INFURA_API_KEY}`),
    transport: http(),
  });
};
