/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This file serves as a centralized location for color definitions, making it easier to maintain and update styles.
 *
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/),
 * [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Tint colors for light and dark modes
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// Button colors
const primaryButtonColor = '#4F6EF7';
const secondaryButtonColor = 'transparent';

// Additional color definitions
const errorColor = '#FF3B30'; // Error state color
const successColor = '#4CAF50'; // Success state color
const warningColor = '#FFA500'; // Warning state color
const infoColor = '#2196F3'; // Info state color

export const Colors = {
  light: {
    text: '#11181C', // Primary text color
    selectedText: '#6186FF', // Color for selected text
    background: '#fff', // Background color for light mode
    tint: tintColorLight, // Tint color for light mode
    icon: '#687076', // Default icon color
    tabIconDefault: '#687076', // Default tab icon color
    tabIconSelected: tintColorLight, // Selected tab icon color
    primaryButton: primaryButtonColor, // Primary button color
    secondaryButton: secondaryButtonColor, // Secondary button color
    outlineButton: 'transparent', // Outline button color
    error: errorColor, // Error color for alerts
    success: successColor, // Success color for notifications
    warning: warningColor, // Warning color for alerts
    info: infoColor, // Info color for informational messages
    border: '#E0E0E0', // Border color for light mode
    shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color for light mode
    inputBackground: '#fff', // Added input background color for light mode
  },
  dark: {
    text: '#ECEDEE', // Primary text color for dark mode
    selectedText: '#6186FF', // Color for selected text in dark mode
    background: '#181818', // Background color for dark mode
    tint: tintColorDark, // Tint color for dark mode
    icon: '#9BA1A6', // Default icon color for dark mode
    tabIconDefault: '#9BA1A6', // Default tab icon color for dark mode
    tabIconSelected: tintColorDark, // Selected tab icon color for dark mode
    primaryButton: primaryButtonColor, // Primary button color for dark mode
    secondaryButton: secondaryButtonColor, // Secondary button color for dark mode
    outlineButton: '#1f1f21', // Outline button color for dark mode
    error: errorColor, // Error color for alerts in dark mode
    success: successColor, // Success color for notifications in dark mode
    warning: warningColor, // Warning color for alerts in dark mode
    info: infoColor, // Info color for informational messages in dark mode
    border: '#444', // Border color for dark mode
    shadow: 'rgba(0, 0, 0, 0.5)', // Shadow color for dark mode
    inputBackground: '#2C2C2E', // Added input background color for dark mode
  },
};
