import { DefaultTheme } from '@/common/constants/Themes';
import { useTheme as useThemeReactNative } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export function useTheme() {
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark';
  return colorScheme === 'dark' ? DefaultTheme : useThemeReactNative();
}
