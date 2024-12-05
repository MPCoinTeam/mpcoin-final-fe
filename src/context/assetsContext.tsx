import { BaseToken, Chain } from '@/domain/interfaces/assets';
import { useAssets } from '@/domain/usecases/hooks/assets/useAssets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface AssetsContextType {
  chains: Chain[];
  tokens: BaseToken[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const STORAGE_KEYS = {
  CHAINS: '@assets_chains',
  TOKENS: '@assets_tokens',
};

const AssetsContext = createContext<AssetsContextType | null>(null);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [chains, setChains] = useState<Chain[]>([]);
  const [tokens, setTokens] = useState<BaseToken[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const { chains: fetchedChains, tokens: fetchedTokens, isLoading, isError, error } = useAssets();

  // Load cached data on mount
  useEffect(() => {
    async function loadCachedData() {
      try {
        const [cachedChains, cachedTokens] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.CHAINS),
          AsyncStorage.getItem(STORAGE_KEYS.TOKENS),
        ]);

        if (cachedChains) setChains(JSON.parse(cachedChains));
        if (cachedTokens) setTokens(JSON.parse(cachedTokens));
      } catch (error) {
        console.warn('Error loading cached assets:', error);
      } finally {
        setIsInitialized(true);
      }
    }

    loadCachedData();
  }, []);

  useEffect(() => {
    if (fetchedChains?.length && isInitialized) {
      setChains(fetchedChains);
      AsyncStorage.setItem(STORAGE_KEYS.CHAINS, JSON.stringify(fetchedChains)).catch((error) => console.warn('Error caching chains:', error));
    }
  }, [fetchedChains, isInitialized]);

  useEffect(() => {
    if (fetchedTokens?.length && isInitialized) {
      setTokens(fetchedTokens);
      AsyncStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(fetchedTokens)).catch((error) => console.warn('Error caching tokens:', error));
    }
  }, [fetchedTokens, isInitialized]);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AssetsContext.Provider
      value={{
        chains,
        tokens,
        isLoading: isLoading && !chains.length && !tokens.length,
        isError,
        error,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}

export function useAssetsContext() {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error('useAssetsContext must be used within AssetsProvider');
  }
  return context;
}
