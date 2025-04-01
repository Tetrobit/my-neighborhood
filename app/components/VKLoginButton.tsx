import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { vkAuth } from '../services/vkAuth';

interface VKLoginButtonProps {
  onLoginSuccess?: (user: any) => void;
  onLoginError?: (error: any) => void;
}

export const VKLoginButton: React.FC<VKLoginButtonProps> = ({
  onLoginSuccess,
  onLoginError,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const user = await vkAuth.login();
      onLoginSuccess?.(user);
    } catch (error) {
      console.error('VK login error:', error);
      onLoginError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>Войти через ВКонтакте</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0077FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 