import AddressStep from '../steps/AddressStep';
import AmountStep from '../steps/AmountStep';
import ConfirmStep from '../steps/ConfirmStep';
import { Colors } from '@/common/constants/Colors';
import { useAuth } from '@/context/authContext';
import { useViem } from '@/context/viemContext';
import { useBalance } from '@/domain/usecases/hooks/assets/useBalance';
import { useCreateTransaction } from '@/domain/usecases/hooks/transactions/useCreateTransaction';
import { ThemedLoading } from '@/presentation/atoms/Loading';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Address } from 'viem';

interface TransactionStepsProps {
  currentStep: number;
  steps: React.JSX.Element[];
}

const TransactionSteps: React.FC<TransactionStepsProps> = ({ currentStep, steps }) => {
  return <Pressable style={styles.modalContainer}>{steps[currentStep]}</Pressable>;
};

interface TransactionFeedbackProps {
  status: 'loading' | 'success' | 'error' | '';
}

const TransactionFeedback: React.FC<TransactionFeedbackProps> = ({ status }) => {
  if (status === 'loading') {
    return (
      <Pressable style={styles.modalContainer}>
        <ThemedLoading style={styles.centeredContainer} />
      </Pressable>
    );
  }

  if (status === 'success') {
    return (
      <Pressable style={styles.modalContainer}>
        <ThemedView style={styles.centeredContainer}>
          <ThemedIcon name="checkmark-circle" size={150} style={styles.successIcon} type="Ionicons" />
        </ThemedView>
      </Pressable>
    );
  }

  if (status === 'error') {
    return (
      <Pressable style={styles.modalContainer}>
        <ThemedView style={styles.centeredContainer}>
          <ThemedIcon name="exclamationcircle" size={150} style={styles.errorIcon} type="AntDesign" />
          <ThemedText>Error sending transaction</ThemedText>
        </ThemedView>
      </Pressable>
    );
  }

  return null;
};

interface SendTokenModalProps {
  closeModal: () => void;
}

export default function SendTokenModal({ closeModal }: SendTokenModalProps) {
  const { profile } = useAuth();
  const { calculateGasFee, currentChain } = useViem();
  const { data: tokenBalance } = useBalance();
  const { createTransaction, isSuccess, isError, isLoading } = useCreateTransaction();

  const [currentStep, setCurrentStep] = useState(0);
  const [toAddress, setToAddress] = useState('0x6BfB916D5b8Df15e6879e9024D543Dec70518385');
  const [amount, setAmount] = useState('0');
  const [fee, setFee] = useState('0');
  const [feeUsd, setFeeUsd] = useState('0');

  const tokenSymbol = tokenBalance?.[0]?.symbol || '';
  const maxAmount = useMemo(() => Number(tokenBalance?.[0]?.balance || 0).toFixed(8), [tokenBalance]);

  const fetchFee = useCallback(async () => {
    if (profile?.wallet?.address && toAddress && amount) {
      try {
        const gasFee = await calculateGasFee(currentChain.id, profile.wallet.address as Address, toAddress as Address, amount);
        setFee(Number(gasFee).toFixed(5));
        setFeeUsd((Number(gasFee) * (tokenBalance?.[0]?.currentPrice || 0)).toFixed(2));
      } catch (error) {
        console.error('Error calculating gas fee', error);
      }
    }
  }, [amount, toAddress, profile?.wallet?.address, currentChain, calculateGasFee, tokenBalance]);

  useEffect(() => {
    if (currentStep === 2) fetchFee();
  }, [currentStep, fetchFee]);

  const handleConfirm = useCallback(async () => {
    if (!profile?.wallet?.address) {
      console.error('Missing wallet address');
      return;
    }

    const response = await createTransaction({
      chain_id: currentChain.id,
      from_address: profile.wallet.address,
      to_address: toAddress as Address,
      amount,
      symbol: tokenSymbol,
    });

    console.log('Transaction response:', response);
    // closeModal();
  }, [profile?.wallet?.address, createTransaction, currentChain.id, toAddress, amount, tokenSymbol]);

  const steps = useMemo(
    () => [
      <AddressStep key="address" address={toAddress} setAddress={setToAddress} setCurrentStep={setCurrentStep} />,
      <AmountStep
        key="amount"
        setCurrentStep={setCurrentStep}
        amount={amount}
        setAmount={setAmount}
        maxAmount={maxAmount}
        tokenSymbol={tokenSymbol}
      />,
      <ConfirmStep
        key="confirm"
        setCurrentStep={setCurrentStep}
        amount={amount}
        address={toAddress}
        feeUsd={feeUsd}
        fee={fee}
        handleConfirm={handleConfirm}
      />,
    ],
    [toAddress, amount, maxAmount, tokenSymbol, fee, feeUsd, handleConfirm],
  );

  const status = isLoading ? 'loading' : isSuccess ? 'success' : isError ? 'error' : '';

  return status ? <TransactionFeedback status={status} /> : <TransactionSteps currentStep={currentStep} steps={steps} />;
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.dark.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    paddingBottom: 25,
    alignItems: 'center',
    width: '100%',
    height: '60%',
    justifyContent: 'space-between',
    gap: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    color: '#41B715',
  },
  errorIcon: {
    color: '#E74C3C',
  },
});
