import { NODE_ENV_DEFAULT } from '@/common/constants/Environments';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';

export function useActivities() {
  const { nodeEnv } = useConfig();
  if (nodeEnv == NODE_ENV_DEFAULT) {
    return {
      activities: undefined,
      pagination: {
        offset: 0,
        limit: 10,
        total: 0,
      },
    };
  }
  return {};
}
