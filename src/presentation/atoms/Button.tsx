import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'outline';
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
}

const ThemedButton: React.FC<ButtonProps> = ({ title, onPress, disabled = false, type = 'primary', style, icon }) => {
  const backgroundColor = useThemeColor({}, `${type}Button`);
  const typeStyles = getTypeStyles(type, backgroundColor);

  const buttonStyles = [styles.button, disabled ? styles.disabledButton : typeStyles, style];
  const textStyle = [{ color: typeStyles.color }, styles.text];

  return (
    <View style={styles.container}>
      <Pressable style={buttonStyles} onPress={onPress} disabled={disabled}>
        <ThemedView style={styles.buttonContent}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={textStyle}>{title}</Text>
        </ThemedView>
      </Pressable>
    </View>
  );
};

const getTypeStyles = (type: string, backgroundColor: string) => {
  if (type === 'secondary') {
    return {
      borderWidth: 1,
      borderColor: '#4F6EF7',
      color: '#4F6EF7',
    };
  }
  return { backgroundColor, color: '#FFFFFF' };
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: '#2C2C2E',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default ThemedButton;
