import axiosInstance from '@/domain/https/https';
import { AuthLoginRequest, AuthLoginResponse } from '@/domain/interfaces/auth';
import { useMutation } from '@tanstack/react-query';

const postLogin = async (request: AuthLoginRequest): Promise<AuthLoginResponse> => {
  const { data } = await axiosInstance.post('/auth/login', request);
  return data;
};

export function useLogin() {
  const { isError, data, error, mutate } = useMutation({
    mutationKey: ['useLogin'],
    mutationFn: postLogin,
  });
  return { isError, data, error, mutate };
}
