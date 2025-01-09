import { apis } from '@/domain/https/apis/internal';
import { CreateTransactionRequest, CreateTransactionResponse } from '@/domain/interfaces/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

// function mockCreateTransaction(params: CreateTransactionRequest): Promise<CreateTransactionResponse> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         id: 'd4e9fd8b-9025-483a-96c1-f8c73902d39f',
//         chainId: 11155111,
//         fromAddress: params.from_address,
//         toAddress: params.to_address,
//         txHash: '0x50ef0d24846b7e47bc33187772e310d87f746ba5d7dec8f51af56abcb6e3b21c',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       });
//     }, 2000);
//   });
// }
function mockCreateTransaction(params: CreateTransactionRequest): Promise<CreateTransactionResponse> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Transaction failed due to insufficient funds.'));
    }, 2000);
  });
}

export function useCreateTransaction() {
  const mutation = useMutation<CreateTransactionResponse, Error, CreateTransactionRequest>({
    mutationFn: mockCreateTransaction,
    onSuccess: (data) => {
      // Handle success
      return data;
    },
    onError: (error) => {
      // Handle error if needed
      console.error('Error creating transaction:', error);
    },
    retry: false,
    cacheTime: 0,
  } as UseMutationOptions<CreateTransactionResponse, Error, CreateTransactionRequest>);

  const createTransaction = (params: CreateTransactionRequest) => mutation.mutateAsync(params);

  return {
    createTransaction,
    isLoading: mutation.status === 'pending', // Dùng status thay vì isLoading
    isError: mutation.status === 'error', // Dùng status thay vì isError
    error: mutation.error,
    isSuccess: mutation.status === 'success', // Kiểm tra success status
  };
}
