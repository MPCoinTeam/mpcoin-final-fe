import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, type = 'primary' }) => {
  const backgroundColor = useThemeColor({}, `${type}Button`);

  const buttonStyles = [styles.button, disabled ? styles.disabledButton : getTypeStyles(type, backgroundColor)];

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

export default Button;
