import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { apiService } from '../utils/api';
import Logo from '../components/Logo';

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

export default function AdditionalInfoScreen() {
  const [age, setAge] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    if (!age || selectedInterests.length === 0) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.updateProfile({
        age: parseInt(age),
        interests: selectedInterests,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить информацию');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Logo />
        <Text style={styles.title}>Дополнительная информация</Text>
        <Text style={styles.subtitle}>Расскажите немного о себе</Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Возраст</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите ваш возраст"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Ваши увлечения</Text>
            <View style={styles.interestsContainer}>
              {INTERESTS.map(interest => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.interestButton,
                    selectedInterests.includes(interest) && styles.interestButtonSelected,
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text
                    style={[
                      styles.interestText,
                      selectedInterests.includes(interest) && styles.interestTextSelected,
                    ]}
                  >
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Сохранение...' : 'Продолжить'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
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
  button: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 