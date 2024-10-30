import React, {ForwardedRef, forwardRef} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import {Black, Gray, Red, Brown} from '@/constants';

interface IInputProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const Input = forwardRef(
  (
    {
      disabled = false,
      error = '',
      touched = false,
      onFocus,
      onBlur,
      style,
      ...props
    }: IInputProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = React.useRef<TextInput | null>(null);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur && onBlur(e);
    };

    return (
      <Pressable onPress={() => innerRef.current?.focus()}>
        <View
          style={[
            styles.container,
            isFocused && styles.focused,
            disabled && styles.disabled,
            error && touched && styles.error,
            style,
          ]}>
          <TextInput
            ref={node => {
              innerRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            editable={!disabled}
            style={styles.input}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            placeholderTextColor={Gray.DEFAULT}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </View>
        {!!error && touched && <Text style={styles.errorText}>{error}</Text>}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 5,
    borderColor: Gray.LIGHT,
  },
  input: {
    fontSize: 15,
    paddingVertical: 0,
    color: Black.DEFAULT,
  },
  focused: {
    borderColor: Brown.Primary,
  },
  disabled: {
    backgroundColor: Gray.LIGHT,
    color: Gray.DEFAULT,
  },
  error: {
    borderColor: Red.LIGHT,
  },
  errorText: {
    fontSize: 12,
    color: Red.DEFAULT,
    paddingTop: 4,
  },
});

export default Input;
