import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Edit3, LogOut, User } from 'lucide-react-native';

export default function AccountScreen() {
  const { user, signOut, updateProfile, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  // If not authenticated, redirect to auth screen
  if (!user && !authLoading) {
    router.replace('../auth');
    return null;
  }

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0891b2" />
      </View>
    );
  }

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateProfile({ name });
      setIsEditing(false);
      Alert.alert('Успешно', 'Профиль успешно обновлен');
    } catch (error: any) {
      Alert.alert('Ошибка', error.message || 'Не удалось обновить профиль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Мой аккаунт</Text>
        <Pressable style={styles.actionButton} onPress={() => setIsEditing(!isEditing)}>
          <Edit3 size={24} color="#0f172a" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user?.avatar_url ? (
              <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholderAvatar}>
                <User size={60} color="#94a3b8" />
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            {isEditing ? (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Ваше имя"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            ) : (
              <Text style={styles.userName}>{user?.name || 'Пользователь'}</Text>
            )}
            <Text style={styles.userEmail}>{user?.email}</Text>

            {isEditing && (
              <Pressable 
                style={styles.saveButton} 
                onPress={handleUpdateProfile}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.saveButtonText}>Сохранить изменения</Text>
                )}
              </Pressable>
            )}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          
          <Pressable style={styles.settingsItem}>
            <Text style={styles.settingsText}>Уведомления</Text>
          </Pressable>
          
          <Pressable style={styles.settingsItem}>
            <Text style={styles.settingsText}>Приватность</Text>
          </Pressable>
          
          <Pressable style={styles.settingsItem}>
            <Text style={styles.settingsText}>Помощь</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logoutButton} onPress={signOut}>
          <LogOut size={20} color="#ef4444" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Выйти</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  actionButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    padding: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748b',
  },
  inputContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
    minWidth: 250,
  },
  input: {
    height: 48,
    fontSize: 16,
    color: '#0f172a',
  },
  saveButton: {
    backgroundColor: '#0891b2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  settingsSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  settingsItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  settingsText: {
    fontSize: 16,
    color: '#0f172a',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 32,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
}); 