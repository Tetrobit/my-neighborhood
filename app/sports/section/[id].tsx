import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { SportSection } from '../../utils/types/api';
import { Calendar, Clock } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { MOCK_SECTIONS } from '../../utils/mock/sports';
import { BackButton } from '../../components/back-button';
import { CallButton } from '../../components/call-button';
import { Skeleton } from '../../components/skeleton';
import { formatPrice } from '../../utils/format';

export default function SectionDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [section, setSection] = useState<SportSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      const foundSection = MOCK_SECTIONS.find(s => s.id === id);
      setSection(foundSection || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <BackButton />
        <ScrollView style={styles.content}>
          <Skeleton style={styles.titleSkeleton} />
          <Skeleton style={styles.priceSkeleton} />
          <Skeleton style={styles.infoSkeleton} />
          <Skeleton style={styles.infoSkeleton} />
          <Skeleton style={styles.infoSkeleton} />
          <Skeleton style={styles.descriptionSkeleton} />
          <Skeleton style={styles.scheduleSkeleton} />
        </ScrollView>
      </View>
    );
  }

  if (!section) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <BackButton />
        <View style={styles.content}>
          <Text style={styles.notFound}>Секция не найдена</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <BackButton />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{section.name}</Text>
        
        <View style={styles.priceBlock}>
          <Text style={styles.price}>{formatPrice(section.price)}</Text>
          <Text style={styles.priceLabel}>в месяц</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Тренер:</Text>
          <Text style={styles.infoValue}>{section.trainer}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Минимальный возраст:</Text>
          <Text style={styles.infoValue}>{section.minAge} лет</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Уровень подготовки:</Text>
          <Text style={styles.infoValue}>{section.level}</Text>
        </View>

        {section.description && (
          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionLabel}>Описание</Text>
            <Text style={styles.description}>{section.description}</Text>
          </View>
        )}

        <View style={styles.scheduleBlock}>
          <Text style={styles.scheduleLabel}>Расписание занятий</Text>
          {section.schedule.map((slot, index) => (
            <View key={index} style={styles.scheduleItem}>
              <Text style={styles.scheduleDay}>{slot.day}</Text>
              <Text style={styles.scheduleTime}>{slot.time.join(', ')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <CallButton phone="+7 (999) 123-45-67" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginRight: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  descriptionBlock: {
    marginTop: 24,
    marginBottom: 24,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  scheduleBlock: {
    marginBottom: 24,
  },
  scheduleLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  scheduleDay: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  scheduleTime: {
    fontSize: 16,
    color: '#666',
  },
  notFound: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
  titleSkeleton: {
    height: 32,
    width: '80%',
    marginBottom: 16,
  },
  priceSkeleton: {
    height: 40,
    width: '40%',
    marginBottom: 24,
  },
  infoSkeleton: {
    height: 24,
    marginBottom: 16,
  },
  descriptionSkeleton: {
    height: 100,
    marginVertical: 24,
  },
  scheduleSkeleton: {
    height: 200,
  },
}); 