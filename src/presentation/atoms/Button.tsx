import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'outline';
  style?: StyleProp<ViewStyle>;
}

const ThemedButton: React.FC<ButtonProps> = ({ title, onPress, disabled = false, type = 'primary', style }) => {
  const backgroundColor = useThemeColor({}, `${type}Button`);

  const buttonStyles = [styles.button, disabled ? styles.disabledButton : getTypeStyles(type, backgroundColor), style];

  return (
    <View style={styles.container}>
      <Pressable style={buttonStyles} onPress={onPress} disabled={disabled}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

const getTypeStyles = (type: string, backgroundColor: string) => {
  if (type === 'outline') {
    return {
      borderWidth: 1,
      borderColor: '#4F6EF7',
    };
  }
  return { backgroundColor };
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
});

export default ThemedButton;
