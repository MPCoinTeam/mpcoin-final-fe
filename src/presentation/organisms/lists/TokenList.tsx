import { useTokens } from '@/domain/usecases/hooks/tokens/useTokens';
import { ThemedLoading } from '@/presentation/atoms/Loading';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import NullList from '@/presentation/molecules/NullList';
import TokenItem from '@/presentation/molecules/TokenItem';
import { StyleSheet } from 'react-native';

interface TokenListProps {}

export default function TokenList({}: TokenListProps): React.JSX.Element {
  const { isLoading, data } = useTokens();
  if (isLoading) return <ThemedLoading />;
  if (!data?.balances) return <NullList title="No tokens" />;
  return (
    <ThemedView style={styles.view}>
      {data.balances.map((balance: any, i: number) => (
        <TokenItem key={i} {...balance} />
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
