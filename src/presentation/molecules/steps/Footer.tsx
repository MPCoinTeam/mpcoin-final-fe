import Button from '@/presentation/atoms/Button';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { StyleSheet, ViewStyle } from 'react-native';

export function Footer({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <ThemedView style={[styles.footer, style]}>{children}</ThemedView>;
}

export function FooterWithButton({
  title,
  disabled,
  onPress,
  icon,
  style,
}: {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <Footer style={style}>
      <Button title={title} style={styles.button} disabled={disabled} onPress={onPress} icon={icon} />
    </Footer>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    marginTop: 'auto',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    backgroundColor: '#6286ff',
  },
});
