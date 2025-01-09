import { ThemedView } from '../atoms/ThemedView';
import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { Image, StyleSheet } from 'react-native';

interface TokenItemProps {
  logoURI: string;
  symbol: string;
  balance: string;
  balanceInUSD?: string;
  currentPrice?: number;
  inflationRate?: number;
}

export default function TokenItem({
  logoURI,
  symbol,
  balance,
  currentPrice = 0,
  inflationRate = 0,
  balanceInUSD = '0',
}: TokenItemProps): React.JSX.Element {
  const color = useThemeColor({}, 'icon') as string;
  const formattedBalance = Number(balance || '0').toFixed(2);
  return (
    <ThemedView style={styles.view}>
      <Image source={{ uri: logoURI }} style={styles.icon} defaultSource={require('@assets/images/default-token.png')} />
      <ThemedView style={styles.priceView}>
        <ThemedText style={styles.titleText}>{symbol}</ThemedText>
        <ThemedText style={{ ...styles.contentText, color }}>
          ${currentPrice.toFixed(2)} ({inflationRate.toFixed(2)}%)
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.balanceView}>
        <ThemedText style={styles.titleText}>{formattedBalance}</ThemedText>
        <ThemedText style={{ ...styles.contentText, color }}>${balanceInUSD}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  icon: {
    borderRadius: 17.5, // Half of width/height (35/2)
    width: 35,
    height: 35,
  },
  priceView: {
    marginLeft: 15,
    flex: 1,
  },
  balanceView: {
    alignItems: 'flex-end',
    minWidth: 100,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 2,
    lineHeight: 20,
  },
  contentText: {
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
  },
});
