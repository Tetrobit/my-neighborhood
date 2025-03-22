import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, PressableProps } from 'react-native';

interface ButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  title,
  loading = false,
  variant = 'primary',
  size = 'medium',
  style,
  ...rest
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[`${size}Size`],
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <Pressable disabled={loading || rest.disabled} {...rest}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#0891b2' : '#ffffff'}
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#0891b2',
  },
  secondary: {
    backgroundColor: '#64748b',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0891b2',
  },
  smallSize: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  mediumSize: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 100,
  },
  largeSize: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 120,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#ffffff',
  },
  outlineText: {
    color: '#0891b2',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
}); 