import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import { AuthRequest, AuthResponse } from '@/domain/interfaces/auth';
import { UserProfile } from '@/domain/interfaces/user';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const postLogin = async (request: AuthRequest): Promise<AuthResponse> => {
  const {
    data: { payload },
  } = await axiosInstance.post<{ payload: AuthResponse }>('/auth/login', request);
  return payload;
};

export function useLogin() {
  const { login, setProfile } = useAuth();

  const mutation = useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const profile = new UserProfile(data.profile, data.wallet);
      setProfile(profile);
      login(data.access_token, data.refresh_token);
    },
    retry: false,
    cacheTime: 0,
  } as UseMutationOptions<AuthResponse, Error, AuthRequest>);

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
