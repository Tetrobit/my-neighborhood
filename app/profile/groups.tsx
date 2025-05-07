import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { router, useFocusEffect, Stack } from 'expo-router';
import { apiService } from '../utils/api';
import { Linking } from 'react-native';

export default function InterestGroupsScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const user = await apiService.getCurrentUser();
      if (user) {
        setProfile(user.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const interests = profile?.interests || [];

  const INTEREST_GROUPS: Record<string, { title: string; link: string }> = {
    'Спорт': { title: 'Группа любителей спорта Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Дача': { title: 'Группа дачников Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Искусство': { title: 'Группа любителей искусства Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Музыка': { title: 'Группа музыкантов Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Кино': { title: 'Группа киноманов Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Кулинария': { title: 'Группа кулинаров Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Путешествия': { title: 'Группа путешественников Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Фотография': { title: 'Группа фотографов Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Рукоделие': { title: 'Группа рукодельников Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Садоводство': { title: 'Группа садоводов Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Чтение': { title: 'Группа любителей чтения Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
    'Технологии': { title: 'Группа по технологиям Казани', link: 'https://t.me/+B4VXTaNGzD5mZGYy' },
  };

  return (
    <>
      {/* Скрываем header, tabBarStyle убираем */}
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#0f172a" />
          </Pressable>
          <Text style={styles.headerTitle}>Группы по интересам</Text>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0891b2" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            {interests && interests.length > 0 ? (
              interests.map((interest: string) =>
                INTEREST_GROUPS[interest] ? (
                  <Pressable
                    key={interest}
                    style={styles.groupCard}
                    onPress={() => Linking.openURL(INTEREST_GROUPS[interest].link)}
                  >
                    <Text style={styles.groupTitle}>{INTEREST_GROUPS[interest].title}</Text>
                    <Text style={styles.groupLink}>Перейти в Telegram</Text>
                  </Pressable>
                ) : null
              )
            ) : (
              <Text style={styles.emptyGroupsText}>Тут пока ничего нет, выберите интересы при редактировании профиля</Text>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    marginRight: 10,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  groupCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
  },
  groupLink: {
    color: '#0891b2',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyGroupsText: {
    color: '#64748b',
    fontSize: 15,
    marginBottom: 8,
  },
}); 