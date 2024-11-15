import { AxiosRequestConfig } from 'axios';

export default function signUp(config: AxiosRequestConfig) {
  return {
    status: 200,
    data: {
      payload: {
        user: {
          id: '123',
          email: config.data.email,
        },
        wallet: {
          id: '123',
          user_id: '123',
          address: '123',
        },
        access_token: 'abvcan',
        refetch_token: 'abvcan',
      }
    },
  };
}
