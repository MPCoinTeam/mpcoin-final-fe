export type TransactionStatus = 'Confirmed' | 'Pending' | 'Failed';

export const TransactionStatusColors = {
  Confirmed: '#4CAF50',
  Pending: '#FFC107',
  Failed: '#F44336',
} as const;

export type TransactionType = 'Sent' | 'Received';
