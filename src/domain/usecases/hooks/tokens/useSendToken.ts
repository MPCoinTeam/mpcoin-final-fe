import axiosInstance from '@/domain/https/https';
import UserInfo from '@/domain/interfaces/user';
import { useMutation } from '@tanstack/react-query';

interface SendTokenRequest {
    address_to: string;
    wallet_id: string;
    token_id: string;
    amount: number;
    chain_id: string;
}

const sendToken = async (request: string) => {
  const { data: { payload } } = await axiosInstance.post(`/transaction`);
  return { user: new UserInfo(payload.user) };
};

export function useSendToken({ amount, address_to }: { amount: number, address_to: string }) {
  const { isPending, isError, data, error, mutate  } = useMutation({
    mutationKey: ['useSendToken'],
    mutationFn: sendToken,
    retry: false,
  });
  return { isPending, isError, mutate, error, data };
}
