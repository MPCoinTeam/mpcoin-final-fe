import { apis } from '@/domain/https/apis/internal';
import { CreateTransactionRequest, CreateTransactionResponse } from '@/domain/interfaces/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useCreateTransaction() {
  const mutation = useMutation<CreateTransactionResponse, AxiosError, CreateTransactionRequest>({
    mutationFn: apis.createTransaction,
    onSuccess: (data) => {
      return data;
    },
    retry: false,
    cacheTime: 0,
  } as UseMutationOptions<CreateTransactionResponse, AxiosError, CreateTransactionRequest>);

  return {
    createTransaction: mutation.mutate,
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
