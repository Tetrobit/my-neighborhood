import { View, Text, ScrollView, StyleSheet, Pressable, Animated } from 'react-native';
import { Href, Link } from 'expo-router';
import { Store, Recycle, MapPin, LucideIcon, ChevronRight, Wheat, Gift, Wrench, Briefcase, Calendar, ClipboardList, Dumbbell,  Stethoscope, Baby, Home} from 'lucide-react-native';

import { useEffect, useRef, useState } from 'react';
import { apiService } from '../utils/api';
import { useFocusEffect } from 'expo-router';
import React from 'react';

export default function MiniAppsScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [age, setAge] = useState<number | null>(null);
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Обновлять возраст при возврате на экран
  useFocusEffect(
    React.useCallback(() => {
      apiService.getCurrentUser().then(user => {
        if (user && user.data && user.data.age) {
          setAge(user.data.age);
        }
      });
    }, [])
  );

  const miniApps: Array<{icon: LucideIcon, title: string, description: string, href: Href}> = [
    {
      icon: Dumbbell,
      title: 'Спортивные секции',
      description: 'Спортивные секции для детей и взрослых',
      href: '/sports',
    },
    { 
      icon: Stethoscope, 
      title: 'Медицинские организации', 
      description: 'Клиники, больницы и медицинские центры',
      href: '/medical' 
    },
    { 
      icon: Store, 
      title: 'Бизнесы', 
      description: 'Найдите местные магазины и услуги',
      href: '/business/1' 
    },
    { 
      icon: Wrench, 
      title: 'Местные службы', 
      description: 'Сантехники, ремонтники, уборка и другие услуги',
      href: '/localservices' 
    },
    {
      icon: Baby,
      title: 'Кружки для детей и подростков',
      description: 'Творческие, научные и языковые кружки для детей и подростков',
      href: '/kidsclubs',
    },
    { 
      icon: Briefcase, 
      title: 'Малый бизнес', 
      description: 'Поддержите местных предпринимателей',
      href: '/smallbusiness' as any
    },
    { 
      icon: Calendar, 
      title: 'Мероприятия', 
      description: 'Афиша событий вашего района',
      href: '/events' as any
    },
    { 
      icon: Recycle, 
      title: 'Переработка', 
      description: 'Пункты приема вторсырья',
      href: '/recycling/1' 
    },
    { 
      icon: MapPin, 
      title: 'Карта', 
      description: 'Интерактивная карта района',
      href: '/map' 
    },
    { 
      icon: Wheat, 
      title: 'Фермерский рынок', 
      description: 'Покупка продуктов напрямую у фермеров',
      href: '/farmer-market'    },
    {
      icon: Gift,
      title: 'Фримаркет',
      description: 'Обмен ненужными вещами с соседями',
      href: '/freemarket'
    },
    {
      icon: ClipboardList,
      title: 'Опросы',
      description: 'Участвуйте в опросах и голосованиях',
      href: '/surveys'
    },
    {
      icon: Home,
      title: 'Аренда квартир',
      description: 'Сдайте или найдите квартиру в аренду',
      href: '/rentals',
    },
  ];
  
  // Группируем сервисы по возрасту
  let mainServicesTitles: string[] = [];
  if (age !== null) {
    if (age <= 20) {
      mainServicesTitles = ['Мероприятия', 'Спортивные секции', 'Фримаркет'];
    } else if (age <= 40) {
      mainServicesTitles = ['Спортивные секции', 'Медицинские организации', 'Местные службы'];
    } else {
      mainServicesTitles = ['Медицинские организации', 'Местные службы', 'Фермерский рынок'];
    }
  } else {
    // Пока не загрузился возраст — дефолт
    mainServicesTitles = ['Спортивные секции', 'Медицинские организации', 'Местные службы'];
  }
  const mainServices = miniApps.filter(app => mainServicesTitles.includes(app.title));
  const otherServices = miniApps.filter(app => !mainServicesTitles.includes(app.title));

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Сервисы</Text>
          <Text style={styles.headerSubtitle}>Все важные функции в одном месте</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.miniAppsSection}>
          <Text style={styles.sectionTitle}>Может понадобиться:</Text>
          <View style={styles.miniAppsGrid}>
            {mainServices.map((app, index) => (
              <Link key={app.title} href={app.href} asChild>
                <Pressable style={styles.miniAppButton}>
                  <View style={styles.miniAppIcon}>
                    <app.icon size={24} color="#0891b2" />
                  </View>
                  <View style={styles.miniAppContent}>
                    <Text style={styles.miniAppTitle}>{app.title}</Text>
                    <Text style={styles.miniAppDescription}>{app.description}</Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </Pressable>
              </Link>
            ))}
          </View>

          <Text style={[styles.sectionTitle, {marginTop: 32}]}>Все сервисы:</Text>
          <View style={styles.miniAppsGrid}>
            {otherServices.map((app, index) => (
              <Link key={app.title} href={app.href} asChild>
                <Pressable style={styles.miniAppButton}>
                  <View style={styles.miniAppIcon}>
                    <app.icon size={24} color="#0891b2" />
                  </View>
                  <View style={styles.miniAppContent}>
                    <Text style={styles.miniAppTitle}>{app.title}</Text>
                    <Text style={styles.miniAppDescription}>{app.description}</Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  content: {
    flex: 1,
  },
  miniAppsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  miniAppsGrid: {
    gap: 12,
  },
  miniAppButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  miniAppIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  miniAppContent: {
    flex: 1,
  },
  miniAppTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  miniAppDescription: {
    fontSize: 14,
    color: '#64748b',
  },
}); 