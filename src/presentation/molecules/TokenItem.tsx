import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '../atoms/ThemedView';
import CoinIcon from './CoinIcon';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';

interface TokenItemProps {
  type: string;
  price: number;
  balance: number;
  totalValue: number;
  inflationRate: number;
}

export default function TokenItem({ type, price, balance, totalValue, inflationRate }: TokenItemProps): JSX.Element {
  const color = useThemeColor({}, 'icon');
    return (
      <ThemedView style={styles.view}>
        <CoinIcon
          size={20}
          type={type}
        />
        <ThemedView style={styles.priceView}>
          <ThemedText style={styles.titleText}>{type}</ThemedText>
          <ThemedText style={{...styles.contentText, color}}>${price.toFixed(2)}({inflationRate.toFixed(2)}%)</ThemedText>
        </ThemedView>
        <ThemedView style={styles.balanceView}>
          <ThemedText style={styles.titleText}>{balance}</ThemedText>
          <ThemedText style={{...styles.contentText, color}}>${totalValue}</ThemedText>
        </ThemedView>
      </ThemedView>
    )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  priceView: {
    marginLeft: 15,
  },
  balanceView: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  titleText: {
    fontSize: 13,
    height: 16,
    fontWeight: 500
  },
  contentText: {
    fontSize: 13,
    fontWeight: 400,
  },
});

