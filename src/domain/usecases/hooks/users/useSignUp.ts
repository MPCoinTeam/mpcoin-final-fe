import { apis } from '@/domain/https/apis/internal';
import { AuthRequest, AuthResponse } from '@/domain/interfaces/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useSignup() {

  const mutation = useMutation<AuthResponse, AxiosError, AuthRequest>({
    mutationFn: apis.signup,
    onSuccess: (data) => {
      return data;
    },
    retry: false,
    cacheTime: 0,
  } as UseMutationOptions<AuthResponse, AxiosError, AuthRequest>);

  return {
    signup: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
