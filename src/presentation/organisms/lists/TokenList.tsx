import { useBalance } from '@/domain/usecases/hooks/assets/useBalance';
import { ThemedLoading } from '@/presentation/atoms/Loading';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import NullList from '@/presentation/molecules/NullList';
import TokenItem from '@/presentation/molecules/TokenItem';
import { StyleSheet } from 'react-native';

interface TokenListProps {}

export default function TokenList({}: TokenListProps): React.JSX.Element {
  const { isPending, data: tokens } = useBalance();

  if (isPending) return <ThemedLoading />;
  if (!tokens?.length) return <NullList title="No tokens" />;
  return (
    <ThemedView style={styles.view}>
      {tokens.map((token, i) => (
        <TokenItem key={token.contractAddress || i} {...token} logoURI={token.logoUrl || ''} />
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
