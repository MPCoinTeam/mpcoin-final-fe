import { useTokenBalances } from '@/domain/usecases/hooks/tokens/useTokenBalances';
import { ThemedLoading } from '@/presentation/atoms/Loading';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import NullList from '@/presentation/molecules/NullList';
import TokenItem from '@/presentation/molecules/TokenItem';
import { StyleSheet } from 'react-native';

interface TokenListProps {}

export default function TokenList({}: TokenListProps): React.JSX.Element {
  const { data: tokens, isLoading } = useTokenBalances();

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
