import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Doctor, OrganizationInfo } from '@/app/utils/types/api';
import { ChevronLeft, Phone, Star, Calendar } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { MOCK_DOCTORS, MOCK_ORGANIZATIONS } from '@/app/utils/mock/medical';

export default function DoctorDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      const foundDoctor = MOCK_DOCTORS.find(d => d.id === id);
      if (foundDoctor) {
        // Найдем организацию, в которой работает врач
        const organization = MOCK_ORGANIZATIONS.find(org => 
          org.doctors.some(d => d.id === id)
        );
        // Добавим информацию об организации к данным врача
        setDoctor({
          ...foundDoctor,
          organization: organization ? {
            id: organization.id,
            name: organization.name,
            address: organization.address,
            phone: organization.phone
          } : undefined
        });
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCallPress = () => {
    if (doctor?.organization?.phone) {
      Linking.openURL(`tel:${doctor.organization.phone}`);
    }
  };

  const handleBackPress = () => {
    if (doctor?.organization?.id) {
      router.push(`/medical/organization/${doctor.organization.id}`);
    } else {
      router.push('/medical');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={styles.centerContainer}>
        <Text>Врач не найден</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: doctor.name,
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {doctor.photo && (
            <Image source={{ uri: doctor.photo }} style={styles.doctorImage} />
          )}
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialization}>{doctor.specialization}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" />
            <Text style={styles.rating}>{doctor.rating}/5</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Информация</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Стоимость приема:</Text>
              <Text style={styles.infoValue}>{doctor.price} ₽</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Опыт работы:</Text>
              <Text style={styles.infoValue}>{doctor.experience} лет</Text>
            </View>
          </View>

          {doctor.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>О враче</Text>
              <Text style={styles.description}>{doctor.description}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Расписание</Text>
            {doctor.schedule.map((slot: { day: string; time: string[] }, index: number) => (
              <View key={index} style={styles.scheduleRow}>
                <Calendar size={16} color="#666" />
                <Text style={styles.scheduleDay}>{slot.day}</Text>
                <Text style={styles.scheduleTime}>{slot.time.join(', ')}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.callButton}
            onPress={handleCallPress}
          >
            <Phone size={20} color="#fff" />
            <Text style={styles.callButtonText}>Записаться на прием</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  specialization: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  scheduleDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    width: 100,
  },
  scheduleTime: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 24,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginLeft: 8,
  },
}); 