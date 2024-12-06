import AddressStep from '../steps/AddressStep';
import AmountStep from '../steps/AmountStep';
import ConfirmStep from '../steps/ConfirmStep';
import { Colors } from '@/common/constants/Colors';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface SendTokenModalProps {
  closeModal: () => void;
}

export default function SendTokenModal({ closeModal }: SendTokenModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState('0x8E72E28580D7DBbb04717FECE7d0310A10A56364');
  const [amount, setAmount] = useState('0');
  const [maxAmount, setMaxAmount] = useState('0.0015');
  const [feeUsd, setFeeUsd] = useState('0.5');
  const [tokenSymbol, setTokenSymbol] = useState('ETH');
  const [fee, setFee] = useState('0.112 ETH');
  const steps = useMemo(
    () => [
      <AddressStep address={address} setAddress={setAddress} setCurrentStep={setCurrentStep} />,
      <AmountStep setCurrentStep={setCurrentStep} amount={amount} setAmount={setAmount} maxAmount={maxAmount} tokenSymbol={tokenSymbol} />,
      <ConfirmStep setCurrentStep={setCurrentStep} amount={amount} address={address} feeUsd={feeUsd} fee={fee} />,
    ],
    [address, amount, maxAmount, tokenSymbol, feeUsd, fee],
  );

  return <Pressable style={styles.modalContainer}>{steps[currentStep]}</Pressable>;
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
});
