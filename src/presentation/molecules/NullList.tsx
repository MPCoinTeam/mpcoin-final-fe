import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';

interface NullListProps {
  title: string;
}

export default function NullList({ title }: NullListProps): React.JSX.Element {
  const color = useThemeColor({}, 'icon');
  return (
    <>
      <ThemedIcon name="fast-food-outline" size={40} type="Ionicons" />
      <ThemedText style={{ color: color }}>{title}</ThemedText>
    </>
  );
}
