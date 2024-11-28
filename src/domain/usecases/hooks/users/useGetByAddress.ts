import axiosInstance from '@/domain/https/https';
import UserInfo from '@/domain/interfaces/user';
import { useMutation } from '@tanstack/react-query';

const fetchUser = async (address: string) => {
  const { data: { payload } } = await axiosInstance.get(`/users?address=${address}`);
  return { user: new UserInfo(payload.user) };
};

export function useGetByAddress() {
  const { isPending, isError, data, error, mutate  } = useMutation({
    mutationKey: ['useGetByAddress'],
    mutationFn: fetchUser,
    retry: false,
  });
  return { isPending, isError, mutate, error, data };
}
