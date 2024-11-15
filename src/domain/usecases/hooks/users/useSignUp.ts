import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import { AuthSignUpRequest, AuthSignUpResponse } from '@/domain/interfaces/auth';
import { useMutation } from '@tanstack/react-query';

const postSignUp = async (request: AuthSignUpRequest): Promise<AuthSignUpResponse> => {
  const { data: { payload } } = await axiosInstance.post('/auth/signup', request);
  return payload;
};

export function useSignUp() {
  const { login } = useAuth();
  const { isPending, isError, data, error, isSuccess, mutate } = useMutation({
    mutationKey: ['useSignUp'],
    mutationFn: postSignUp,
    retry: false,
  });
  if (isSuccess && login) {
    login(data.access_token);
  }
  return { isPending, isError, data, error, mutate };
}
