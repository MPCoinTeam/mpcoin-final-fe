import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import { useActivities } from '@/domain/usecases/hooks/activities/useActivities';

interface ActivityListProps {}

export default function ActivityList({}: ActivityListProps): JSX.Element {
  const { activities } = useActivities();
  const color = useThemeColor({}, 'icon');
  if (!activities) {
    return (
      <>
        <ThemedIcon name="fast-food-outline" size={40} type='Ionicons' />
        <ThemedText style={{color: color}}>No activities</ThemedText>
      </>
    )
  }
  return <div/>;
}
