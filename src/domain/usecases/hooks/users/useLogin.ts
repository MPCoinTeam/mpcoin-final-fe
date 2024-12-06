import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import { AuthRequest, AuthResponse } from '@/domain/interfaces/auth';
import { Profile } from '@/domain/interfaces/profile';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const postLogin = async (request: AuthRequest): Promise<AuthResponse> => {
  const {
    data: { payload },
  } = await axiosInstance.post('/auth/login', request);
  return payload;
};

export function useLogin() {
  const { login, setProfile } = useAuth();

  const mutation = useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const profile: Profile = {
        user: data.user,
        wallet: data.wallet,
      };
      setProfile(profile);
      login(data.accessToken, data.refreshToken);
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
