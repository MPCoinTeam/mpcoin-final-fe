import { IconType } from '@/presentation/atoms/ThemedIcon';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { StyleSheet } from 'react-native';

export const ValueWithIcon = ({
  value,
  icon,
  iconType,
  unit,
  valueStyle,
  iconSize = 20,
}: {
  value: string;
  icon: string;
  iconType: string;
  unit?: string;
  valueStyle?: object;
  iconSize?: number;
}) => (
  <ValueContainer>
    <ThemedText style={[styles.value, valueStyle]}>{value}</ThemedText>
    <ThemedIcon name={icon} size={iconSize} style={styles.icon} type={iconType as IconType} />
    {unit && <ThemedText style={styles.value}>{unit}</ThemedText>}
  </ValueContainer>
);

export const ValueContainer = ({ children }: { children: React.ReactNode }) => <ThemedView style={styles.valueContainer}>{children}</ThemedView>;

const styles = StyleSheet.create({
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#6286ff',
  },
});
