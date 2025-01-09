import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ConfirmHeader } from '@/presentation/molecules/steps/ConfirmHeader';
import { FooterWithButton } from '@/presentation/molecules/steps/Footer';
import { InfoCard } from '@/presentation/molecules/steps/InfoCard';
import { Row } from '@/presentation/molecules/steps/Row';
import { ValueContainer, ValueWithIcon } from '@/presentation/molecules/steps/Value';
import { StyleSheet } from 'react-native';

interface ConfirmStepProps {
  setCurrentStep: (step: number) => void;
  amount: string;
  address: string;
  feeUsd: string;
  fee: string;
  handleConfirm: () => void;
}

const truncateAddress = (address: string) => `${address.slice(0, 10)}...${address.slice(-10)}`;

export default function ConfirmStep({ setCurrentStep, amount, address, feeUsd, fee, handleConfirm }: ConfirmStepProps) {
  return (
    <>
      <ConfirmHeader title="Tx Review" onBack={() => setCurrentStep(1)} />

      <InfoCard>
        <Row label="Send" isFirst>
          <ValueWithIcon value={amount} icon="ethereum" iconType="MaterialCommunityIcons" unit="ETH" />
        </Row>
        <Row label="To" value={truncateAddress(address)} />
        <Row label="Network" isLast>
          <ValueWithIcon value="Sepolia" icon="ethereum" iconType="MaterialCommunityIcons" iconSize={16} valueStyle={styles.networkText} />
        </Row>
      </InfoCard>

      <InfoCard>
        <Row label="Max Fee" isFirst isLast>
          <ValueContainer>
            <ThemedText style={styles.feeUsd}>({feeUsd} USD)</ThemedText>
            <ThemedText style={styles.value}>{fee}</ThemedText>
          </ValueContainer>
        </Row>
      </InfoCard>

      <FooterWithButton title="Slide To Send" onPress={handleConfirm} />
    </>
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  networkText: {
    color: '#6286ff',
    fontSize: 16,
    fontWeight: '500',
  },
  feeUsd: {
    color: '#939393',
    fontSize: 14,
    marginRight: 8,
  },
});
