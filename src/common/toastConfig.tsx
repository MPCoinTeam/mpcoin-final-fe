import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast, BaseToastProps, ErrorToast, InfoToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast {...props} style={styles.success} text1Style={styles.text1} text2Style={styles.text2} text2NumberOfLines={3} />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast {...props} style={styles.error} text1Style={styles.text1} text2Style={styles.text2} text2NumberOfLines={3} />
  ),
  info: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <InfoToast {...props} style={styles.info} text1Style={styles.text1} text2Style={styles.text2} text2NumberOfLines={3} />
  ),
};

const styles = StyleSheet.create({
  success: {
    borderLeftColor: 'green',
    backgroundColor: '#DFFFD6',
    borderRadius: 10,
    width: '90%',
  },
  error: {
    borderLeftColor: 'red',
    backgroundColor: '#FFDDDD',
    borderRadius: 10,
    width: '90%',
  },
  info: {
    borderLeftColor: '#5B9BD5',
    backgroundColor: '#DDEBFF',
    borderRadius: 10,
    width: '90%',
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 14,
    flexWrap: 'wrap', // Cho phép xuống dòng
    flexShrink: 1, // Giúp text không bị cắt
  },
});
