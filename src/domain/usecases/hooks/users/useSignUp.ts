import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import { AuthSignUpRequest, AuthSignUpResponse } from '@/domain/interfaces/auth';
import { useMutation } from '@tanstack/react-query';

const postSignUp = async (request: AuthSignUpRequest): Promise<AuthSignUpResponse> => {
  const { data } = await axiosInstance.post('/auth/signup', request);
  return data;
};

export function useSignUp() {
  const { saveToken } = useAuth()
  const { isPending ,isError, data, error, isSuccess, mutate } = useMutation({
    mutationKey: ['useSignUp'],
    mutationFn: postSignUp,
    retry: false
  });
  if (isSuccess && saveToken) {
    saveToken(data.access_token)
  }
  return { isPending, isError, data, error, mutate };
}
