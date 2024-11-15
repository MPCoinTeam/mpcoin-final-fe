import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

export type ThemedLoadingProps = ActivityIndicatorProps;

export function ThemedLoading({ style, ...rest }: ThemedLoadingProps) {
  const backgroundColor = useThemeColor({}, 'background');
  return <ActivityIndicator style={[{ backgroundColor }, style]} {...rest} />;
}
