import Button from '@/presentation/atoms/Button';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const OTP_LENGTH = 6;

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    // Focus the first input when the component mounts
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === '' && index > 0 && newOtp[index] === '') {
      // Handle backspace when the current input is empty
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    } else {
      // Handle input
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      // Move focus to previous input on backspace press when current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Implement your OTP verification logic here
    console.log('Verifying OTP:', otp.join(''));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Pressable onPress={Keyboard.dismiss} style={styles.content}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to your email</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref!)}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                value={digit}
              />
            ))}
          </View>

          <Button title="Verify" onPress={handleVerify} disabled={otp.join('').length !== OTP_LENGTH} />

          <Pressable onPress={() => console.log('Resend OTP')}>
            <Text style={styles.resendText}>Resend Code</Text>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#4F6EF7',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#4F6EF7',
    borderRadius: 10,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  resendText: {
    color: '#4F6EF7',
    marginTop: 20,
    fontSize: 16,
  },
});
