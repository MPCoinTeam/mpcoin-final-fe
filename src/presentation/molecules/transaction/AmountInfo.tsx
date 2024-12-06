import { ThemedText } from '@/presentation/atoms/ThemedText';
import { getDisplayValue } from '@/utils/formatters';
import { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

interface AmountInfoProps {
  type: string;
  amount: string;
  token: string;
  tokenIcon?: string;
}

export const AmountInfo = memo(({ type, amount, token, tokenIcon }: AmountInfoProps) => (
  <ThemedText style={styles.title}>
    <Image source={{ uri: tokenIcon }} style={styles.icon} defaultSource={require('@assets/images/default-token.png')} />
    {type} {getDisplayValue(amount, 'amount')} {token}
  </ThemedText>
));

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 4,
    borderRadius: 16,
  },
});
