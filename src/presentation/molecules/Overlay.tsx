import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const squareSize = width * 0.7;

const ScannerOverlay = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.topBottomOverlay} />
      <View style={styles.middleRow}>
        <View style={styles.sideOverlay} />
        <View style={styles.square} />
        <View style={styles.sideOverlay} />
      </View>
      <View style={styles.topBottomOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBottomOverlay: {
    width: '100%',
    height: (height - squareSize) / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideOverlay: {
    width: (width - squareSize) / 2,
    height: squareSize,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  square: {
    width: squareSize,
    height: squareSize,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
});

export default ScannerOverlay;
