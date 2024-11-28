import { ThemedView } from '../atoms/ThemedView';
import { IconType, ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

type CoinIconType = 'ETH' | 'USDC' | 'USDT' | string;

interface CoinIconProps {
  size: number;
  type: CoinIconType;
}

interface CoinIconMapItem {
  name: string;
  type: IconType;
  backgroundColor: string;
}

const CoinIconMap: { [key in CoinIconType]: CoinIconMapItem } = {
  ETH: {
    name: 'ethereum',
    type: 'FontAwesome5',
    backgroundColor: '#006CFF',
  },
  USDC: {
    name: 'usd',
    type: 'FontAwesome',
    backgroundColor: '#2775CA',
  },
  USDT: {
    name: 'usdt',
    type: 'FontAwesome',
    backgroundColor: '#26A17B',
  },
};

export default function CoinIcon({ size, type }: CoinIconProps) {
  const coinMap = useMemo(() => CoinIconMap[type], [type]);
  return (
    <ThemedView style={{...styles.view, height: size*3/2, width: size*3/2}}>
      <ThemedIcon style={styles.icon} size={size} name={coinMap.name} type={coinMap.type} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  view: {
    borderRadius: 50,
    backgroundColor: '#006CFF',
    height: 30,
    width: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#fff',
  },
});
