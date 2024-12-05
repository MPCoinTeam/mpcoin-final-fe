import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import { AuthRequest, AuthResponse } from '@/domain/interfaces/auth';
import { UserProfile } from '@/domain/interfaces/user';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const postSignUp = async (request: AuthRequest): Promise<AuthResponse> => {
  const {
    data: { payload },
  } = await axiosInstance.post<{ payload: AuthResponse }>('/auth/signup', request);
  return payload;
};

export function useSignup() {
  const { login, setProfile } = useAuth();

  const mutation = useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: postSignUp,
    onSuccess: (data) => {
      const profile = new UserProfile(data.profile, data.wallet);
      setProfile(profile);
      login(data.access_token, data.refresh_token);
    },
    retry: false,
    cacheTime: 0,
  } as UseMutationOptions<AuthResponse, Error, AuthRequest>);

  return {
    signup: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
