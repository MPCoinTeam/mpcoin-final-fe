import { useThemeColor } from "@/domain/usecases/hooks/themes/useThemeColor";
import React, { forwardRef } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface ThemedInputProps extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

const ThemedInput = forwardRef<TextInput, ThemedInputProps>(
  ({ placeholder, secureTextEntry, ...props }, ref) => {
    const backgroundColor = useThemeColor({}, "background");
    const textColor = useThemeColor({}, "text");
    return (
      <TextInput
        ref={ref}
        style={[styles.input, { backgroundColor, color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        secureTextEntry={secureTextEntry}
        {...props}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
    width: "100%",
  },
});

export default ThemedInput;
