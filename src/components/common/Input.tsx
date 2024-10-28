import React from 'react';
import {Pressable, StyleSheet, Text, TextInputProps, View} from 'react-native';
import {Black, Gray, Red} from '../../constants';
import {TextInput} from 'react-native-gesture-handler';

interface IInputProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

export default function Input({
  disabled = false,
  error = '',
  inputMode = 'text',
  touched = false,
  ...props
}: IInputProps) {
  const inputRef = React.useRef<TextInput | null>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View
        style={[
          styles.container,
          disabled && styles.disabled,
          error && touched && styles.error,
        ]}>
        <TextInput
          ref={inputRef}
          editable={!disabled}
          style={styles.input}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          inputMode={inputMode}
          placeholderTextColor={Gray.DEFAULT}
          {...props}
        />
        {!!error && touched && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
  },
  input: {
    fontSize: 15,
    paddingVertical: 0,
    color: Black.DEFAULT,
  },
  disabled: {
    backgroundColor: Gray.LIGHT,
    color: Gray.DEFAULT,
  },
  error: {
    borderWidth: 1,
    borderColor: Red.LIGHT,
  },
  errorText: {
    fontSize: 12,
    color: Red.DEFAULT,
    paddingTop: 4,
  },
});
