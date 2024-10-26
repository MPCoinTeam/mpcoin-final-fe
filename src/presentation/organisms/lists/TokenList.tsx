import { useTokens } from '@/domain/usecases/hooks/tokens/useTokens';
import NullList from '@/presentation/molecules/NullList';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { StyleSheet } from 'react-native';
import TokenItem from '@/presentation/molecules/TokenItem';

interface TokenListProps {}

export default function TokenList({}: TokenListProps): JSX.Element {
  const { tokens } = useTokens();
  if (!tokens) {
    return <NullList title='No tokens' />
  }
  return (
    <ThemedView style={styles.view}>
      {tokens.map((token)=><TokenItem {...token} />)}
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
