import { useTokens } from '@/domain/usecases/hooks/tokens/useTokens';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import NullList from '@/presentation/molecules/NullList';
import TokenItem from '@/presentation/molecules/TokenItem';
import { StyleSheet } from 'react-native';

interface TokenListProps {}

export default function TokenList({}: TokenListProps): JSX.Element {
  const { tokens } = useTokens();
  if (!tokens) {
    return <NullList title="No tokens" />;
  }
  return (
    <ThemedView style={styles.view}>
      {tokens.map((token, i) => (
        <TokenItem key={i} {...token} />
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
