import { Colors } from '@/common/constants/Colors';
import { useSignUp } from '@/domain/usecases/hooks/users/useSignUp';
import Button from '@/presentation/atoms/Button';
import ThemedInput from '@/presentation/atoms/ThemedInput';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// import { authApi } from "@/api/endpoints";

export default function SignupScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { mutate: signUp, isPending } = useSignUp();

  const setErrorsWithTimeout = (newErrors: string[]) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 5000); // Clear errors after 5 seconds
  };

  //   async function performSignup(
  //     email: string,
  //     password: string
  //   ): Promise<string[]> {
  //     try {
  //       const response = await authApi.signup({
  //         email,
  //         password,
  //       });
  //       console.log("response", response);
  //       return []; // Return an empty array if signup is successful
  //     } catch (error) {
  //       if (error instanceof AxiosError && error.response) {
  //         // Handle known API errors
  //         if (error.response.status === 400) {
  //           return [error.response.data.message || "Bad request"];
  //         } else if (error.response.status === 409) {
  //           return ["Email already exists"];
  //         } else if (error.response.status === 500) {
  //           return ["Internal server error"];
  //         }
  //       }
  //       // Handle any other errors
  //       return ["An unexpected error occurred"];
  //     }
  //   }

  // function verifyPassword(): string[] {
  //   const conditions = [
  //     password.length < 8 ? 'Password must be at least 8 characters long' : '',
  //     password.length > 20 ? 'Password must be at most 20 characters long' : '',
  //     !/^(?=.*[A-Za-z])(?=.*\d)[\w@#$%^&*()-+=]{8,20}$/.test(password) ? 'Password must contain at least one letter and one number' : '',
  //     password !== confirmPassword ? 'Passwords do not match' : '',
  //   ];

  //   return conditions.filter(Boolean);
  // }

  const handleSignup = () => {
    // console.log('handleSignup', email, password, confirmPassword);
    signUp({ email, password })
    // const validationErrors = verifyPassword();
    // if (validationErrors.length === 0) {
    //   const apiErrors = [''];
    //   if (errors.length === 0) {
    //     console.log('Signup successful');
    //     router.push('/auth/otp');
    //   } else {
    //     setErrorsWithTimeout(apiErrors);
    //   }
    // } else {
    //   setErrorsWithTimeout(validationErrors);
    // }
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
              <Button title="Sign Up" onPress={handleSignup} disabled={isPending} />
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
