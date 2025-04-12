import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MedicalOrganization } from '@/app/utils/types/api';
import { Phone, MapPin, Star } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { MOCK_ORGANIZATIONS } from '@/app/utils/mock/medical';

export default function MedicalOrganizationsScreen() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<MedicalOrganization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setOrganizations(MOCK_ORGANIZATIONS);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOrganizationPress = (organization: MedicalOrganization) => {
    router.push(`/medical/organization/${organization.id}`);
  };

  const handleCallPress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMapPress = (organization: MedicalOrganization) => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${organization.latitude},${organization.longitude}`;
    const label = organization.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Медицинские организации',
        }} 
      />
      <View style={styles.container}>
        {loading ? (
          <View style={styles.centerContainer}>
            <Text>Загрузка...</Text>
          </View>
        ) : (
          <FlatList
            data={organizations}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleOrganizationPress(item)}
              >
                {item.photos && item.photos.length > 0 && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.photos[0] }} style={styles.image} />
                    <View style={styles.imageOverlay}>
                      <View style={styles.ratingContainer}>
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}/5</Text>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.content}>
                  <Text style={styles.title}>{item.name}</Text>
                  
                  <View style={styles.infoRow}>
                    <MapPin size={16} color="#666" />
                    <Text style={styles.address}>{item.address}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Phone size={16} color="#666" />
                    <Text style={styles.phone}>{item.phone}</Text>
                  </View>

                  <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                      <Text style={styles.statValue}>{item.doctors.length}</Text>
                      <Text style={styles.statLabel}>Врачей</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                      <Text style={styles.statValue}>
                        {item.workingHours.find(h => h.day === 'Понедельник')?.start} - {item.workingHours.find(h => h.day === 'Понедельник')?.end}
                      </Text>
                      <Text style={styles.statLabel}>Часы работы</Text>
                    </View>
                  </View>

                  <Text numberOfLines={2} style={styles.description}>
                    {item.description}
                  </Text>
                  
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                      style={[styles.button, styles.callButton]} 
                      onPress={() => handleCallPress(item.phone)}
                    >
                      <Phone size={16} color="#fff" />
                      <Text style={styles.buttonText}>Записаться</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.button, styles.mapButton]}
                      onPress={() => handleMapPress(item)}
                    >
                      <MapPin size={16} color="#fff" />
                      <Text style={styles.buttonText}>На карте</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              setTimeout(() => {
                setOrganizations(MOCK_ORGANIZATIONS);
                setLoading(false);
              }, 1000);
            }}
          />
        )}
      </View>
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
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    marginVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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
}); 