import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';

interface NullListProps {
    title: string
}

export default function NullList({ title }: NullListProps): JSX.Element {
    const color = useThemeColor({}, 'icon');
    return (
      <>
        <ThemedIcon name="fast-food-outline" size={40} type='Ionicons' />
        <ThemedText style={{color: color}}>{title}</ThemedText>
      </>
    )
}
