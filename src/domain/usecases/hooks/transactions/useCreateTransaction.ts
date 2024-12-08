import axiosInstance from '@/domain/https/https';
import { CreateTransactionRequest, CreateTransactionResponse } from '@/domain/interfaces/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const createTransaction = async (request: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
  const {
    data: { payload },
  } = await axiosInstance.post('/transactions', request);
  return payload;
};

export function useCreateTransaction() {
  const mutation = useMutation<CreateTransactionResponse, Error, CreateTransactionRequest>({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      return data;
    },
    retry: false,
    cacheTime: 0,
  } as UseMutationOptions<CreateTransactionResponse, Error, CreateTransactionRequest>);

  return {
    createTransaction: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
