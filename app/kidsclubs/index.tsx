import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking, Platform, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { KidsClubOrganization } from '@/app/utils/types/api';
import { Phone, MapPin, Star, ChevronRight } from 'lucide-react-native';
import { MOCK_KIDS_CLUB_ORGANIZATIONS } from '@/app/utils/mock/kidsclubs';

export default function KidsClubsScreen() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<KidsClubOrganization[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'nearby' | 'district'>('nearby');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOrganizations(MOCK_KIDS_CLUB_ORGANIZATIONS);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrganizations = filter === 'nearby'
    ? organizations
    : organizations.slice(0, 1);
  const filterLabel = filter === 'nearby' ? 'Ближайшие 3 км' : 'Вахитовский район';

  const handleOrganizationPress = (organization: KidsClubOrganization) => {
    router.push(`/kidsclubs/organization/${organization.id}`);
  };

  const handleCallPress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMapPress = (organization: KidsClubOrganization) => {
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
          title: 'Кружки для детей и подростков',
        }} 
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ChevronRight style={{transform: [{rotate: '180deg'}]}} size={24} color="#0f172a" />
          </Pressable>
          <Text style={styles.headerTitle}>Кружки для детей и подростков</Text>
        </View>
        <View style={{marginTop: 8, minHeight: 24, marginLeft: 16}}>
          <Pressable onPress={() => setDropdownOpen(open => !open)} style={styles.dropdownLabelRow}>
            <Text style={[styles.dropdownLabel, filter === 'nearby' && { color: '#64748b' }]}>{filterLabel}</Text>
            <ChevronRight size={16} color="#94a3b8" style={{transform: [{rotate: dropdownOpen ? '90deg' : '0deg'}]}} />
          </Pressable>
          {dropdownOpen && (
            <View style={styles.dropdownMenu}>
              <Pressable
                style={[styles.dropdownItem, filter === 'nearby' && styles.dropdownItemActive]}
                onPress={() => { setFilter('nearby'); setDropdownOpen(false); }}
              >
                <Text style={[styles.dropdownItemText, filter === 'nearby' && styles.dropdownItemTextActive]}>Ближайшие 3 км</Text>
              </Pressable>
              <Pressable
                style={[styles.dropdownItem, filter === 'district' && styles.dropdownItemActive]}
                onPress={() => { setFilter('district'); setDropdownOpen(false); }}
              >
                <Text style={[styles.dropdownItemText, filter === 'district' && styles.dropdownItemTextActive]}>Вахитовский район</Text>
              </Pressable>
            </View>
          )}
        </View>
        {loading ? (
          <View style={styles.centerContainer}>
            <Text>Загрузка...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredOrganizations}
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
                    <Text style={styles.statValue}>{item.clubs.length}</Text>
                    <Text style={styles.statLabel}>Кружков</Text>
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
                <TouchableOpacity 
                  style={[styles.button, styles.callButton]} 
                  onPress={() => handleCallPress(item.phone)}
                >
                  <Phone size={16} color="#fff" />
                  <Text style={styles.buttonText}>Связаться</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.mapButton]}
                  onPress={() => handleMapPress(item)}
                >
                  <MapPin size={16} color="#fff" />
                  <Text style={styles.buttonText}>На карте</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              setTimeout(() => {
                setOrganizations(MOCK_KIDS_CLUB_ORGANIZATIONS);
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
    marginLeft: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  address: {
    flex: 1,
    fontSize: 15,
    color: '#666',
  },
  phone: {
    fontSize: 15,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 8,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0891b2',
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e5e7eb',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
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
  dropdownLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dropdownLabel: {
    fontSize: 15,
    color: '#0891b2',
    fontWeight: '500',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 4,
    marginBottom: 8,
    minWidth: 180,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  dropdownItemActive: {
    backgroundColor: '#e0f2fe',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#0891b2',
  },
  dropdownItemTextActive: {
    fontWeight: 'bold',
  },
}); 