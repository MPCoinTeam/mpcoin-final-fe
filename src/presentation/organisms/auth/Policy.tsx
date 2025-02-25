import { Colors } from '@/common/constants/Colors';
import { useAuth } from '@/context/authContext';
import Button from '@/presentation/atoms/Button';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function PolicyScreen() {
  const { isAuthenticated, profile } = useAuth();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated && profile) {
      router.replace('/');
    }
  }, [isAuthenticated, profile]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.topContent}>
          <ThemedText type="title" style={styles.title}>
            MPCoin
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            A multi-party wallet for Web3
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.bottomContent}>
          <ThemedView style={styles.middleContent}>
            <ThemedView style={styles.checkboxContainer}>
              <Checkbox value={isChecked} onValueChange={setIsChecked} style={styles.checkbox} color={isChecked ? '#4F6EF7' : undefined} />
              <Pressable onPress={() => setIsChecked(!isChecked)}>
                <ThemedText style={styles.checkboxText}>
                  I have read and agree to the <ThemedText style={styles.link}>Terms of Use.</ThemedText>
                </ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
          <Button title="Get Started" onPress={() => router.push('/auth/sign-up')} disabled={!isChecked} type="primary" />
          <Button title="Sign In" onPress={() => router.push('/auth/login')} disabled={!isChecked} type="secondary" />
          <Button
            title="Continue with Google"
            onPress={() => {
              // Toast.show({
              //   type: 'info',
              //   text1: '🔧 Feature Unavailable',
              //   text2: 'Google login is not available at the moment. Please try again later.',
              //   position: 'top',
              //   topOffset: 55,
              // });
              SecureStore.setItemAsync('123', 'ok_123').then(() => {
                console.log('SecureStore.setItemAsync success');
              });
            }}
            disabled={!isChecked}
            type="outline"
          />
          <Button
            title="Get Data"
            onPress={() => {
              const data = SecureStore.getItem('123');
              console.log('SecureStore.getItem', data);
            }}
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Push topContent to top and bottomContent to bottom
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  topContent: {
    alignItems: 'center',
  },
  middleContent: {
    alignItems: 'center',
  },
  bottomContent: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    color: '#4F6EF7',
    marginBottom: 10,
    marginTop: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 40,
    fontWeight: 'normal',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    color: '#A0A0A0',
    flexWrap: 'wrap',
  },
  link: {
    color: '#4F6EF7',
    textDecorationLine: 'underline',
  },
});
