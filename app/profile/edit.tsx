import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { apiService } from '@/app/utils/api';
import { User } from '@/app/utils/types/api';
import { ArrowLeft, Store } from 'lucide-react-native';

const INTERESTS = [
  'Спорт',
  'Дача',
  'Искусство',
  'Музыка',
  'Кино',
  'Кулинария',
  'Путешествия',
  'Фотография',
  'Рукоделие',
  'Садоводство',
  'Чтение',
  'Технологии',
];

export default function EditProfileScreen() {
  const [profile, setProfile] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadProfile();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.error) {
        throw new Error(response.error.message);
      }
      setProfile(response.data);
      setName(response.data.name);
      setPhone(response.data.phone);
      setAge(response.data.age?.toString() || '');
      setInterests(response.data.interests || []);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить профиль');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите имя');
      return;
    }

    try {
      setSaving(true);
      const response = await apiService.updateProfile({
        name: name?.trim(),
        phone: phone?.trim(),
        age: age ? parseInt(age) : undefined,
        interests: interests,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      Alert.alert('😎', 'Профиль успешно обновлен');
      router.back();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось обновить профиль');
    } finally {
      setSaving(false);
    }
  };

  const handleFarmManagement = () => {
    router.push('/profile/farms');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0891b2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Редактировать профиль</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Имя</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Введите ваше имя"
                autoCapitalize="words"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={profile?.email}
                editable={false}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Телефон</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Введите ваш телефон"
                keyboardType="phone-pad"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Возраст</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Введите ваш возраст"
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Увлечения</Text>
              <View style={styles.interestsContainer}>
                {INTERESTS.map(interest => (
                  <TouchableOpacity
                    key={interest}
                    style={[
                      styles.interestButton,
                      interests.includes(interest) && styles.interestButtonSelected,
                    ]}
                    onPress={() => {
                      setInterests(prev =>
                        prev.includes(interest)
                          ? prev.filter(i => i !== interest)
                          : [...prev, interest]
                      );
                    }}
                  >
                    <Text
                      style={[
                        styles.interestText,
                        interests.includes(interest) && styles.interestTextSelected,
                      ]}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.field}>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: '#fbbf24', marginTop: 16 }]}
                onPress={() => router.push('/rentals/add')}
              >
                <Text style={[styles.saveButtonText, { color: '#fff' }]}>Выставить квартиру на продажу</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, saving && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Сохранить изменения</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.farmButton]}
              onPress={handleFarmManagement}
            >
              <Store size={20} color="#ffffff" style={styles.farmIcon} />
              <Text style={styles.buttonText}>Управление фермой</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 24,
    paddingTop: 32,
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
  },
  disabledInput: {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
  },
  button: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  farmButton: {
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  farmIcon: {
    marginRight: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  interestButtonSelected: {
    backgroundColor: '#0891b2',
    borderColor: '#0891b2',
  },
  interestText: {
    color: '#0f172a',
    fontSize: 14,
  },
  interestTextSelected: {
    color: '#ffffff',
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 