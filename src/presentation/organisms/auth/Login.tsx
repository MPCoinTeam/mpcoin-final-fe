import { Colors } from '@/common/constants/Colors';
import { useLogin } from '@/domain/usecases/hooks/users/useLogin';
import Button from '@/presentation/atoms/Button';
import ThemedInput from '@/presentation/atoms/ThemedInput';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const { isPending, login, error } = useLogin();

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
    ];

    return conditions.filter(Boolean);
  }

  const handleLogin = () => {
    const validationErrors = verifyPassword();
    if (validationErrors.length === 0) {
      login({ email, password });
    } else {
      setErrorsWithTimeout(validationErrors);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorsWithTimeout(['Invalid email or password']);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Thử dùng padding cho Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Giảm offset cho Android
        style={styles.container}
        enabled // Chỉ bật khi bàn phím xuất hiện
      >
        <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.topContent}>
              <Text style={styles.title}>Login</Text>
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
                onSubmitEditing={handleLogin}
              />
              <Button title="Login" onPress={handleLogin} disabled={isPending} />
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
