import { Transaction } from '@/domain/interfaces/transaction';
import { useTransactions } from '@/domain/usecases/hooks/transactions/useTransactions';
import NullList from '@/presentation/molecules/NullList';
import TransactionItem from '@/presentation/molecules/transaction/TransactionItem';
import TransactionDetailModal from '@/presentation/organisms/modals/TransactionDetailModal';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

export default function TransactionList(): React.JSX.Element {
  const { transactions, pagination, fetchNextPage, isLoading } = useTransactions();
  const [modalState, setModalState] = useState<{ isOpen: boolean; transaction: Transaction | null }>({
    isOpen: false,
    transaction: null,
  });

  const openModal = useCallback((transaction: Transaction) => {
    setModalState({ isOpen: true, transaction });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, transaction: null });
  }, []);

  const handleScroll = useCallback(
    ({ nativeEvent }: { nativeEvent: any }) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

      if (isEndReached && !isLoading && pagination?.hasMore) {
        fetchNextPage();
      }
    },
    [isLoading, pagination?.hasMore, fetchNextPage],
  );

  const renderTransactionItem = useCallback(
    (transaction: Transaction) => <TransactionItem key={transaction.id} {...transaction} onPress={() => openModal(transaction)} />,
    [openModal],
  );

  const transactionList = useMemo(() => transactions?.map(renderTransactionItem), [transactions, renderTransactionItem]);

  if (!transactions?.length) {
    return <NullList title="No transactions" />;
  }

  return (
    <>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={400}>
        {transactionList}
        {isLoading && <ActivityIndicator style={{ padding: 20 }} />}
      </ScrollView>

      {modalState.isOpen && modalState.transaction && (
        <TransactionDetailModal
          {...modalState.transaction}
          value={modalState.transaction.amount + ' ' + modalState.transaction.token}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
