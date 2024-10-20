import Icon from '@expo/vector-icons/MaterialIcons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';

export type ThemedIconProps = IconProps<ComponentProps<typeof Icon>['name']> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedIconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  return (
    <Icon
      style={[
        { color },
        style,
      ]}
      {...rest}
    />
  );
}