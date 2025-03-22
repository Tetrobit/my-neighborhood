import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        router.replace('/');
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        Alert.alert(
          "Регистрация успешна", 
          "Пожалуйста, проверьте свою электронную почту для подтверждения."
        );
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert("Ошибка", error.message || "Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isLogin ? 'Вход' : 'Регистрация'}</Text>
          <Text style={styles.subtitle}>
            {isLogin 
              ? 'Войдите, чтобы получить доступ к своему аккаунту' 
              : 'Создайте аккаунт, чтобы пользоваться всеми возможностями'}
          </Text>
          
          <View style={styles.inputContainer}>
            <Mail size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Lock size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          {isLogin && (
            <Pressable>
              <Text style={styles.forgotPassword}>Забыли пароль?</Text>
            </Pressable>
          )}
          
          <Pressable 
            style={styles.button} 
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Text>
            )}
          </Pressable>
          
          <Pressable 
            style={styles.switchButton} 
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.switchText}>
              {isLogin 
                ? 'Нет аккаунта? Зарегистрироваться' 
                : 'Уже есть аккаунт? Войти'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
    marginBottom: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#0f172a',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#0891b2',
    alignSelf: 'flex-end',
    marginBottom: 32,
    marginTop: -8,
  },
  button: {
    backgroundColor: '#0891b2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  switchButton: {
    alignItems: 'center',
    padding: 8,
  },
  switchText: {
    fontSize: 14,
    color: '#0891b2',
  },
}); 