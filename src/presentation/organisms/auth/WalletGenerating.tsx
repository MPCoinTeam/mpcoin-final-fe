import { Colors } from '@/common/constants/Colors';
import { useAuth } from '@/context/authContext';
import { saveLargeData } from '@/domain/db/store';
import { Profile } from '@/domain/interfaces/profile';
import { useSignup } from '@/domain/usecases/hooks/users/useSignUp';
import Button from '@/presentation/atoms/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AxiosError } from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const WalletGeneratingScreen = () => {
  const router = useRouter();
  const { setProfile, login } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const params = useLocalSearchParams();
  const { signup } = useSignup();

  const email = String(params.email || '');
  const password = String(params.password || '');

  const hasSignedUp = useRef(false);

  useEffect(() => {
    if (hasSignedUp.current) return; // Ngăn gọi lại
    hasSignedUp.current = true;

    if (!email || !password) {
      setErrorMessage('Missing email or password.');
      return;
    }

    signup(
      { email, password },
      {
        onSuccess: (data) => {
          const profile: Profile = {
            user: data.user,
            wallet: data.wallet,
          };
          console.log('data', data.user.id, data.shareData);
          saveLargeData(data.user.id, data.shareData);
          setIsSuccess(true);
          setTimeout(() => {
            setProfile(profile);
            login(data.accessToken, data.refreshToken);
          }, 3000);
        },
        onError: (error: AxiosError) => {
          console.log(error.message);
          setErrorMessage('Signup failed. Please try again.');
        },
      },
    );
  }, [email, password, signup, setProfile, login]);

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <Text style={styles.subText}>Please go back and try again.</Text>
          <Button title="Go back" onPress={() => router.back()} style={styles.button} type="secondary" />
        </View>
      ) : isSuccess ? (
        <View style={styles.successContainer}>
          <Ionicons name="wallet-outline" size={64} color="white" style={styles.successIcon} />
          <Text style={styles.text}>Your wallet has been successfully generated!</Text>
          <Text style={styles.subText}>Preparing your dashboard...</Text>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.text}>We're generating an MPC wallet for you...</Text>
          <Text style={styles.subText}>Please be patient, this may take up to 30 seconds.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    marginBottom: 10,
  },
  errorContainer: {
    alignItems: 'center', // Căn giữa ngang
    justifyContent: 'center', // Căn giữa dọc
    flex: 1, // Chiếm toàn bộ không gian để căn giữa trong container cha
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.dark.text,
  },
  subText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  errorText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF3B30',
  },
  button: {
    marginTop: 20,
    width: '50%', // Giới hạn chiều rộng nút để trông gọn gàng hơn
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WalletGeneratingScreen;
