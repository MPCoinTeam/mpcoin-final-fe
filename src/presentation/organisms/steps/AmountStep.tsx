import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { AmountHeader } from '@/presentation/molecules/steps/AmountHeader';
import { FooterWithButton } from '@/presentation/molecules/steps/Footer';
import { Keypad } from '@/presentation/molecules/steps/Keypad';
import { StyleSheet } from 'react-native';

interface AmountStepProps {
  setCurrentStep: (step: number) => void;
  amount: string;
  maxAmount: string;
  tokenSymbol: string;
  setAmount: (amount: string) => void;
}

export default function AmountStep({ setCurrentStep, amount, setAmount, maxAmount, tokenSymbol }: AmountStepProps) {
  const handleNumberPress = (num: string) => {
    if (num === '.' && amount.includes('.')) {
      return;
    }

    if (amount === '0' && num !== '.') {
      setAmount(num);
      return;
    }

    const newAmount = amount + num;
    const parsedAmount = parseFloat(newAmount);
    const parsedMaxAmount = parseFloat(maxAmount);

    if (parsedAmount > parsedMaxAmount) {
      setAmount(parsedMaxAmount.toString());
    } else {
      setAmount(newAmount);
    }
  };

  const handleDelete = () => {
    const newAmount = amount.length > 1 ? amount.slice(0, -1) : '0';
    setAmount(newAmount);
  };

  const validAmount = Number(amount) > 0 && Number(amount) <= Number(maxAmount);

  return (
    <>
      <AmountHeader onBack={() => setCurrentStep(0)} tokenSymbol={tokenSymbol} />

      <ThemedView style={styles.amountContainer}>
        <ThemedText style={styles.amount}>{amount}</ThemedText>
        <ThemedText style={styles.maxAmount}>Max: {maxAmount}</ThemedText>
      </ThemedView>

      <Keypad handleNumberPress={handleNumberPress} handleDelete={handleDelete} />

      <FooterWithButton title="Next" disabled={!validAmount} onPress={() => setCurrentStep(2)} />
    </>
  );
}

const styles = StyleSheet.create({
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 64,
    lineHeight: 70,
    fontWeight: 'bold',
    color: '#6286ff',
  },
  maxAmount: {
    fontSize: 14,
    opacity: 0.7,
  },
});
