import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import { AuthLoginRequest, AuthLoginResponse } from '@/domain/interfaces/auth';
import { useMutation } from '@tanstack/react-query';

const postLogin = async (request: AuthLoginRequest): Promise<AuthLoginResponse> => {
  const { data: { payload } } = await axiosInstance.post('/auth/login', request);
  return payload;
};

export function useLogin() {
  const { login } = useAuth();
  const { isPending, isError, data, error, isSuccess, mutate } = useMutation({
    mutationKey: ['useLogin'],
    mutationFn: postLogin,
    retry: false,
  });
  if (isSuccess && login) {
    login(data.access_token);
  }
  return { isPending, isError, data, error, mutate };
}
