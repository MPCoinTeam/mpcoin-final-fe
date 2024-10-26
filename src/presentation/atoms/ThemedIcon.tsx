import * as Icon from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';

export type IconType = 'AntDesign' | 'MaterialIcons' | 'Entypo' | 'EvilIcons' | 'Feather' | 'Fontisto' | 'FontAwesome' | 'FontAwesome5' | 'FontAwesome6' |
  'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial'

export type ThemedIconProps = IconProps<ComponentProps<typeof Icon[IconType]>['name']> & {
  lightColor?: string;
  darkColor?: string;
  type?: IconType;
};

export function ThemedIcon({
  style,
  lightColor,
  darkColor,
  type = 'MaterialIcons',
  ...rest
}: ThemedIconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');
  const IconComponent = Icon[type]
  return <IconComponent style={[
    { color },
    style,
  ]} {...rest} />
}