import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  icon?: LucideIcon;
  iconColor?: string;
  iconSize?: number;
}

export function Input({
  icon: Icon,
  iconColor = '#64748b',
  iconSize = 20,
  style,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      {Icon && <Icon size={iconSize} color={iconColor} style={styles.icon} />}
      <TextInput 
        style={[styles.input, !Icon && styles.noIcon, style]}
        placeholderTextColor="#94a3b8"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#0f172a',
  },
  noIcon: {
    paddingLeft: 0,
  },
}); 