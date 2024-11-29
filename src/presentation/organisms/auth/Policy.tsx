import { Colors } from '@/common/constants/Colors';
import Button from '@/presentation/atoms/Button';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function PolicyScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  return (
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
        <Button title="Register" onPress={() => router.push('/auth/sign-up')} disabled={!isChecked} type="primary" />
        <Button title="Login" onPress={() => router.push('/auth/login')} disabled={!isChecked} type="secondary" />
        {/* <Button title="Other options" onPress={() => console.log('Other options pressed')} disabled={!isChecked} type="outline" /> */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: 'space-between',
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
