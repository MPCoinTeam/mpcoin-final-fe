import { NODE_ENV_DEFAULT } from '@/common/constants/Environments';
import { defaltProfile } from '@/common/constants/Users';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';

export function useProfile() {
  const { nodeEnv } = useConfig();
  if (nodeEnv == NODE_ENV_DEFAULT) {
    return {
      isAuthenticated: true,
      profile: defaltProfile,
    };
  }
  return {};
}

// const { dataUpdatedAt } = useQuery({
//   queryKey: ['myKey'],
//   queryFn: async () => {
//     const response = await fetch(
//       'https://api.github.com/repos/tannerlinsley/react-query',
//     )
//     return response.json()
//   },
//   notifyOnChangeProps,
// })
