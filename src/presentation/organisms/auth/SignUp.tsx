import { Colors } from '@/common/constants/Colors';
import { useSignup } from '@/domain/usecases/hooks/users/useSignUp';
import Button from '@/presentation/atoms/Button';
import ThemedInput from '@/presentation/atoms/ThemedInput';
import { useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { signup, isPending } = useSignup();

  const setErrorsWithTimeout = (newErrors: string[]) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 5000); // Clear errors after 5 seconds
  };

  function verifyPassword(): string[] {
    const conditions = [
      password.length < 8 ? 'Password must be at least 8 characters long' : '',
      password.length > 20 ? 'Password must be at most 20 characters long' : '',
      !/^(?=.*[A-Za-z])(?=.*\d)[\w@#$%^&*()-+=]{8,20}$/.test(password) ? 'Password must contain at least one letter and one number' : '',
      password !== confirmPassword ? 'Passwords do not match' : '',
    ];

    return conditions.filter(Boolean);
  }

  const handleSignup = () => {
    const errors = verifyPassword();
    if (errors.length > 0) {
      setErrorsWithTimeout(errors);
      return;
    }
    signup(
      { email, password },
      {
        onSuccess: () => {
          console.log('Signup successful');
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || 'Signup failed. Please try again.';
          setErrorsWithTimeout([errorMessage]);
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 60}
        style={styles.container}
      >
        <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.topContent}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subtitle}>Create your first wallet</Text>
            </View>

            <View style={styles.bottomContent}>
              {errors.length > 0 && (
                <View style={styles.errorContainer}>
                  {errors.map((error, index) => (
                    <Text key={index} style={styles.errorText}>
                      {error}
                    </Text>
                  ))}
                </View>
              )}

              <ThemedInput
                ref={emailRef}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <ThemedInput
                ref={passwordRef}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />
              <ThemedInput
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSignup}
              />
              <Button title="Sign Up" onPress={handleSignup} disabled={isPending} style={null} />
            </View>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  topContent: {
    alignItems: 'center',
    marginTop: 60,
  },
  bottomContent: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    color: '#4F6EF7',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 40,
  },
  errorContainer: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  pressable: {
    flex: 1,
  },
});
