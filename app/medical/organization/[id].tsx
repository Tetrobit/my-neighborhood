import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { MedicalOrganization, Doctor } from '@/app/utils/types/api';
import { ChevronLeft, Phone, MapPin, Star, Clock } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { MOCK_ORGANIZATIONS } from '@/app/utils/mock/medical';

export default function OrganizationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [organization, setOrganization] = useState<MedicalOrganization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      const org = MOCK_ORGANIZATIONS.find(org => org.id === id);
      setOrganization(org || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCallPress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMapPress = (org: MedicalOrganization) => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${org.latitude},${org.longitude}`;
    const label = org.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const handleDoctorPress = (doctor: Doctor) => {
    router.push(`/medical/doctor/${doctor.id}`);
  };

  const renderDoctor = (doctor: Doctor) => (
    <TouchableOpacity
      key={doctor.id}
      style={styles.doctorCard}
      onPress={() => handleDoctorPress(doctor)}
    >
      {doctor.photo && (
        <Image source={{ uri: doctor.photo }} style={styles.doctorImage} />
      )}
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialization}>{doctor.specialization}</Text>
        <Text style={styles.doctorPrice}>от {doctor.price} ₽</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (!organization) {
    return (
      <View style={styles.centerContainer}>
        <Text>Организация не найдена</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: organization.name,
        }} 
      />
      <ScrollView style={styles.container}>
        {organization.photos && organization.photos.length > 0 && (
          <Image source={{ uri: organization.photos[0] }} style={styles.image} />
        )}
        
        <View style={styles.content}>
          <Text style={styles.title}>{organization.name}</Text>
          <Text style={styles.address}>{organization.address}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" />
            <Text style={styles.rating}>{organization.rating}/5</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.callButton]} 
              onPress={() => handleCallPress(organization.phone)}
            >
              <Phone size={16} color="#fff" />
              <Text style={styles.buttonText}>Записаться</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.mapButton]}
              onPress={() => handleMapPress(organization)}
            >
              <MapPin size={16} color="#fff" />
              <Text style={styles.buttonText}>На карте</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Режим работы</Text>
            {organization.workingHours.map((hours: { day: string; start: string; end: string }, index: number) => (
              <View key={index} style={styles.workingHoursRow}>
                <Clock size={16} color="#666" />
                <Text style={styles.workingHoursText}>
                  {hours.day}: {hours.start} - {hours.end}
                </Text>
              </View>
            ))}
          </View>

          {organization.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Описание</Text>
              <Text style={styles.description}>{organization.description}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Врачи</Text>
            <View style={styles.doctorsGrid}>
              {organization.doctors.map(renderDoctor)}
            </View>
          </View>
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
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  callButton: {
    backgroundColor: '#007AFF',
  },
  mapButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  workingHoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  workingHoursText: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  doctorsGrid: {
    gap: 16,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  doctorSpecialization: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  doctorPrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  backButton: {
    marginLeft: 8,
  },
}); 