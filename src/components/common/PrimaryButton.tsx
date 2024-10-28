import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import {Brown, Gray, White} from '@/constants';

// const DEVICE_HEIGHT = Dimensions.get('window').height

interface IPrimaryButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'medium' | 'large';
  invalid?: boolean;
}

export default function PrimaryButton({
  label,
  variant = 'filled',
  size = 'large',
  invalid = false,
  ...props
}: IPrimaryButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={invalid}
      style={({pressed}) => [
        styles[variant],
        styles[size],
        styles.container,
        invalid && styles.invalid,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
      ]}>
      <Text style={[styles[`${variant}Text`], styles.text]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: Brown.Primary,
  },
  outlined: {
    borderColor: Brown.Primary,
    borderWidth: 1,
  },
  large: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medium: {
    width: '50%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 700,
  },
  filledText: {
    color: White.DEFAULT,
  },
  outlinedText: {
    color: Gray.DEFAULT,
  },
  invalid: {
    opacity: 0.5,
  },
  filledPressed: {
    backgroundColor: Brown.Secondary,
  },
  outlinedPressed: {
    borderColor: Brown.Secondary,
    borderWidth: 1,
    opacity: 0.5,
  },
});
