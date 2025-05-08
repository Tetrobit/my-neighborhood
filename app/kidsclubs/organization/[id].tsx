import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Platform, Pressable } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { KidsClubOrganization } from '@/app/utils/types/api';
import { Phone, MapPin, Star, Clock, ChevronRight } from 'lucide-react-native';
import { MOCK_KIDS_CLUB_ORGANIZATIONS } from '@/app/utils/mock/kidsclubs';

export default function KidsClubOrganizationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [organization, setOrganization] = useState<KidsClubOrganization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const org = MOCK_KIDS_CLUB_ORGANIZATIONS.find(org => org.id === id);
      setOrganization(org || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCallPress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMapPress = (org: KidsClubOrganization) => {
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
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ChevronRight style={{transform: [{rotate: '180deg'}]}} size={24} color="#0f172a" />
          </Pressable>
          <Text style={styles.headerTitle}>{organization.name}</Text>
        </View>
        {organization.photos && organization.photos.length > 0 && (
          <Image source={{ uri: organization.photos[0] }} style={styles.image} />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{organization.name}</Text>
          <View style={styles.infoRow}>
            <MapPin size={16} color="#666" />
            <Text style={styles.address}>{organization.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Phone size={16} color="#666" />
            <Text style={styles.phone}>{organization.phone}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{organization.rating}/5</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.callButton]} 
              onPress={() => handleCallPress(organization.phone)}
            >
              <Phone size={16} color="#fff" />
              <Text style={styles.buttonText}>Связаться</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.mapButton]}
              onPress={() => handleMapPress(organization)}
            >
              <MapPin size={16} color="#fff" />
              <Text style={styles.buttonText}>На карте</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Режим работы</Text>
          {organization.workingHours.map((hours, index) => (
            <View key={index} style={styles.workingHoursRow}>
              <Clock size={16} color="#666" />
              <Text style={styles.workingHoursText}>
                {hours.day}: {hours.start} - {hours.end}
              </Text>
            </View>
          ))}
          {organization.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Описание</Text>
              <Text style={styles.description}>{organization.description}</Text>
            </View>
          )}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Кружки</Text>
            <View style={styles.clubsGrid}>
              {organization.clubs.map(club => (
                <View key={club.id} style={styles.clubCard}>
                  <View style={styles.clubHeader}>
                    <Text style={styles.clubName}>{club.name}</Text>
                    <Text style={styles.clubPrice}>{club.price} ₽/мес</Text>
                  </View>
                  <Text style={styles.clubCategory}>Категория: {club.category}</Text>
                  <Text style={styles.clubInfo}>Возраст: {club.minAge} - {club.maxAge} лет</Text>
                  <Text style={styles.clubInfo}>Контакт: {club.contactPerson}</Text>
                  <Text style={styles.clubDescription}>{club.description}</Text>
                  <TouchableOpacity 
                    style={[styles.button, styles.callButton, {marginTop: 8}]} 
                    onPress={() => handleCallPress(club.phone)}
                  >
                    <Phone size={16} color="#fff" />
                    <Text style={styles.buttonText}>Связаться</Text>
                  </TouchableOpacity>
                </View>
              ))}
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  address: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  phone: {
    fontSize: 16,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  rating: {
    fontSize: 16,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
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
    gap: 8,
    marginBottom: 8,
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
  clubsGrid: {
    gap: 12,
  },
  clubCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  clubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  clubName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  clubPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  clubCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  clubInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  clubDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
}); 