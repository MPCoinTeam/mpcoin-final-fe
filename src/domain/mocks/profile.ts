import { AxiosRequestConfig } from 'axios';

export default function profile(config: AxiosRequestConfig) {
  if (config.headers?.Authorization !== 'Bearer abvcan') return { status: 401, data: { message: 'Unauthenticated' } };
  return {
    status: 200,
    data: {
      payload: {
        user: {
          avatar: 'https://th.bing.com/th/id/OIP.WDpVibS9KhiPPMgQN2I1KAHaHa?rs=1&pid=ImgDetMain',
          wallet_address: '0xb238A3b3cC27239eb78DC5bF01a8ab6538b04B83',
          name: 'Account 1',
          network: 'Sepolia',
        },
      },
    },
  };
}
