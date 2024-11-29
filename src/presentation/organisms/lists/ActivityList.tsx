import { Activity, useActivities } from '@/domain/usecases/hooks/activities/useActivities';
import NullList from '@/presentation/molecules/NullList';
import TransactionItem from '@/presentation/molecules/TransactionItem';
import TransactionDetailModal from '@/presentation/organisms/modals/TransactionDetailModal';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

export default function ActivityList(): React.JSX.Element {
  const { activities, pagination, fetchNextPage, isLoading } = useActivities();
  const [modalState, setModalState] = useState<{ isOpen: boolean; activity: Activity | null }>({
    isOpen: false,
    activity: null,
  });

  const openModal = useCallback((activity: Activity) => {
    setModalState({ isOpen: true, activity });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, activity: null });
  }, []);

  const handleScroll = useCallback(
    ({ nativeEvent }: { nativeEvent: any }) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

      if (isEndReached && !isLoading && pagination?.hasMore) {
        fetchNextPage();
      }
    },
    [isLoading, pagination?.hasMore, fetchNextPage]
  );

  const renderTransactionItem = useCallback(
    (activity: Activity) => (
      <TransactionItem
        key={activity.id}
        {...activity}
        onPress={() => openModal(activity)}
      />
    ),
    [openModal]
  );

  const transactionList = useMemo(
    () => activities?.map(renderTransactionItem),
    [activities, renderTransactionItem]
  );

  if (!activities?.length) {
    return <NullList title="No transactions" />;
  }

  return (
    <>
      <ScrollView 
        onScroll={handleScroll} 
        scrollEventThrottle={400}
      >
        {transactionList}
        {isLoading && <ActivityIndicator style={{ padding: 20 }} />}
      </ScrollView>

      {modalState.isOpen && modalState.activity && (
        <TransactionDetailModal
          {...modalState.activity}
          value={modalState.activity.amount}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
