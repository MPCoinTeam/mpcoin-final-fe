import { useActivities } from '@/domain/usecases/hooks/activities/useActivities';
import NullList from '@/presentation/molecules/NullList';

interface ActivityListProps {}

export default function ActivityList({}: ActivityListProps): React.JSX.Element {
  const { activities } = useActivities();
  if (!activities) {
    return <NullList title="No activities" />;
  }
  return <div />;
}
