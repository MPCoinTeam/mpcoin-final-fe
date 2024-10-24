import { useTokens } from '@/domain/usecases/hooks/tokens/useTokens';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';

interface TokenListProps {}

export default function TokenList({}: TokenListProps): JSX.Element {
  const { tokens } = useTokens();
  const color = useThemeColor({}, 'icon');
  if (!tokens) {
    return (
      <>
        <ThemedIcon name="fast-food-outline" size={40} type='Ionicons' />
        <ThemedText style={{color: color}}>No tokens</ThemedText>
      </>
    )
  }
  return <div/>;
}
