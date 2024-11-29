import { useTokenBalances } from '@/domain/usecases/hooks/blockchain/useTokenBalances';
import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import { ThemedLoading } from '@/presentation/atoms/Loading';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import NullList from '@/presentation/molecules/NullList';
import TokenItem from '@/presentation/molecules/TokenItem';
import { StyleSheet } from 'react-native';

interface TokenListProps {}

export default function TokenList({}: TokenListProps): React.JSX.Element {
  const { data } = useProfile();

  // const { data: tokens, isLoading } = useTokenBalances(data?.profile?.wallet_address);
  const tokens = [
    {
      address: '0x0',
      logoURI: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1746037003',
      symbol: 'BTC',
      balance: '1',
    },
  ];
  const isLoading = false;

  if (isLoading) return <ThemedLoading />;
  if (!tokens?.length) return <NullList title="No tokens" />;

  return (
    <ThemedView style={styles.view}>
      {tokens.map((token, i) => (
        <TokenItem key={token.address || i} {...token} logoURI={token.logoURI || ''} />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
});
