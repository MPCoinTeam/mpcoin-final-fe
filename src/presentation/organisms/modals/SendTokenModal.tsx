import { UserProfile } from '@/domain/interfaces/user';
import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import Button from '@/presentation/atoms/Button';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import ThemedInput from '@/presentation/atoms/ThemedInput';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import CoinIcon from '@/presentation/molecules/CoinIcon';
import ScannnerModal from '@/presentation/organisms/modals/ScannerModal';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput } from 'react-native';

interface SendTokenModalProps {
  closeModal: () => void;
}

interface VerifyAddressModalProps {
  color: string;
  buttonColor: string;
  colorIcon: string;
  inputBackgroundColor: string;
  setCurrentStep: (step: number) => void;
}

interface CommitTransactionModalProps {
  color: string;
  buttonColor: string;
  colorIcon: string;
  data?: UserProfile;
  setCurrentStep: (step: number) => void;
}

const VerifyAddressModal = ({ color, buttonColor, colorIcon, inputBackgroundColor, setCurrentStep }: VerifyAddressModalProps) => {
  const addressRef = useRef<TextInput>(null);
  const [address, setAddress] = useState('0x2C772942Be86CF5D11043967cbA0d0927F73AAcB');

  // const { data, mutate } = useGetByAddress();

  const pasteToClipboard = async () => {
    await Clipboard.getStringAsync().then(setAddress);
  };

  return (
    <>
      <ThemedView style={{ ...styles.viewInput, backgroundColor: inputBackgroundColor }}>
        <ThemedText style={{ color, fontSize: 14 }}>To: </ThemedText>
        <ThemedInput
          ref={addressRef}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          returnKeyType="next"
          // clearTextOnFocus
          onSubmitEditing={() => mutate(address)}
          style={{ ...styles.input, color }}
          numberOfLines={1}
        />
        <ThemedIcon
          name="scan"
          size={20}
          style={{ ...styles.qrIcon, color: buttonColor }}
          type="Ionicons"
          onPress={() => {
            // onOpenModal(() => <ScannnerModal />)
          }}
        />
        <ThemedIcon
          name="content-paste"
          size={20}
          style={{ ...styles.qrIcon, color: buttonColor }}
          type="MaterialCommunityIcons"
          onPress={pasteToClipboard}
        />
      </ThemedView>
      {/* <ThemedView style={styles.viewContent}>
        <ThemedText style={{color: colorIcon}}>Recent contacts: </ThemedText>
        {data && <ThemedView style={styles.nameView}>
          <Image source={{ uri: data.user.avatar }} style={styles.profileIcon} />
          <ThemedText style={{ ...styles.accountText, color }}>{data.user.getFullname()}</ThemedText>
        </ThemedView>}
      </ThemedView> */}
      <ThemedView style={styles.viewButton}>
        <Button title="Next" style={styles.button} onPress={() => setCurrentStep(1)} />
      </ThemedView>
    </>
  );
};

const CommitTransactionModal = ({ color, buttonColor, colorIcon, setCurrentStep, data }: CommitTransactionModalProps) => {
  const countRef = useRef<TextInput>(null);
  const [count, setCount] = useState('');

  const onHandlerSend = () => {
    setCurrentStep(2);
  };

  return (
    <>
      <ThemedView style={styles.viewBackIcon}>
        <ThemedIcon name="arrow-back-circle-outline" size={25} style={{ color: buttonColor }} type="Ionicons" onPress={() => setCurrentStep(0)} />
      </ThemedView>
      <ThemedView style={{ backgroundColor: '!importal', flex: 1, width: '100%', gap: 10 }}>
        <ThemedView style={styles.viewContentItem}>
          <ThemedView style={styles.gap}>
            <ThemedText style={{ color: colorIcon, fontSize: 14 }}>Send</ThemedText>
            <ThemedView style={styles.valueContent}>
              <ThemedInput
                ref={countRef}
                placeholder="0.0"
                value={count}
                onChangeText={setCount}
                returnKeyType="next"
                // clearTextOnFocus
                onSubmitEditing={() => {}}
                style={{ color, width: 30 }}
                keyboardType="numeric"
              />
              <CoinIcon size={12} type={'ETH'} />
              <ThemedText style={{ color, fontSize: 14 }}>ETH</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.gap}>
            <ThemedText style={{ color: colorIcon, fontSize: 14 }}>To</ThemedText>
            <ThemedText style={{ color, fontSize: 14 }}>ETH</ThemedText>
          </ThemedView>
          <ThemedView style={styles.noGrap}>
            <ThemedText style={{ color: colorIcon, fontSize: 14 }}>Network</ThemedText>
            <ThemedView style={styles.valueContent}>
              <CoinIcon size={12} type={'ETH'} />
              <ThemedText style={{ color: buttonColor, fontSize: 14 }}>Sepolia</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={{ ...styles.viewContentItem, ...styles.noGrap }}>
          <ThemedText style={{ color: colorIcon, fontSize: 14 }}>Max Fee</ThemedText>
          <ThemedView style={styles.valueContent}>
            <ThemedText style={{ color: colorIcon, fontSize: 14 }}>(9.08 USD)</ThemedText>
            <ThemedText style={{ color, fontSize: 14 }}>0.00455 ETH</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.viewButton}>
        <Button title="Send" style={styles.button} onPress={onHandlerSend} />
      </ThemedView>
    </>
  );
};

const SuccessTransactionModal = ({ closeModal }: { closeModal: () => void }) => {
  useEffect(() => {
    setTimeout(closeModal, 1000);
  }, []);
  return (
    <ThemedView style={{ backgroundColor: '!importal', height: '100%', justifyContent: 'center' }}>
      <ThemedIcon name="checkmark-circle" size={100} style={{ color: '#41B715' }} type="Ionicons" />
    </ThemedView>
  );
};

export default function SendTokenModal({ closeModal }: SendTokenModalProps) {
  const color = useThemeColor({}, 'text');
  const colorIcon = useThemeColor({}, 'icon');
  const inputBackgroundColor = useThemeColor({}, 'inputBackground');
  const buttonColor = useThemeColor({}, 'primaryButton');
  const [currentStep, setCurrentStep] = useState(0);

  const { data, mutate } = useGetByAddress();

  const steps = [
    <VerifyAddressModal
      color={color}
      colorIcon={colorIcon}
      inputBackgroundColor={inputBackgroundColor}
      buttonColor={buttonColor}
      setCurrentStep={setCurrentStep}
    />,
    <CommitTransactionModal color={color} colorIcon={colorIcon} data={data?.user} buttonColor={buttonColor} setCurrentStep={setCurrentStep} />,
    <SuccessTransactionModal closeModal={closeModal} />,
  ];

  return <Pressable style={styles.modalContainer}>{steps[currentStep]}</Pressable>;
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#1e1e1e',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    height: '50%',
    justifyContent: 'space-between',
    gap: 10,
  },
  viewInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '!importal',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderStyle: 'solid',
    borderColor: '#2A3354',
    borderWidth: 2,
    borderRadius: 5,
    gap: 10,
  },
  input: {
    width: '100%',
  },
  viewButton: {
    backgroundColor: '!importal',
    width: '100%',
  },
  viewContent: {
    backgroundColor: '!importal',
    width: '100%',
    flex: 1,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 5,
  },
  qrIcon: {
    marginLeft: 'auto',
  },
  profileIcon: {
    marginRight: 10,
    borderRadius: 50,
    height: 30,
    width: 30,
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '!importal',
    marginBottom: 10,
    paddingTop: 20,
  },
  accountText: {
    fontWeight: 'bold',
  },
  viewBackIcon: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '!importal',
  },
  viewContentItem: {
    backgroundColor: '!importal',
    width: '100%',
    borderColor: '#222222',
    borderWidth: 1,
    borderRadius: 10,
  },
  gap: {
    borderBottomColor: '#222222',
    borderBottomWidth: 1,
    backgroundColor: '!importal',
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noGrap: {
    backgroundColor: '!importal',
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueContent: {
    flexDirection: 'row',
    backgroundColor: '!importal',
    gap: 5,
    alignItems: 'center',
  },
});
