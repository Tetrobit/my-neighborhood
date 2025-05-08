import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Home, MapPin, Phone, MessageCircle, ChevronRight, ArrowLeft, Plus } from 'lucide-react-native';

const rentals = [
  {
    id: '1',
    title: '1-комнатная квартира на Ленина',
    description: 'Светлая квартира с ремонтом, вся мебель и техника. Рядом метро и магазины.',
    price: '22 000 ₽/мес',
    address: 'ул. Ленина, 15',
    phone: '+7 (999) 123-45-67',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: '2-комнатная у парка',
    description: 'Уютная квартира для семьи. Большая кухня, балкон, тихий двор.',
    price: '30 000 ₽/мес',
    address: 'пр. Мира, 45',
    phone: '+7 (999) 765-43-21',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Студия в центре',
    description: 'Современная студия с новым ремонтом. Всё необходимое для жизни.',
    price: '18 000 ₽/мес',
    address: 'ул. Пушкина, 10',
    phone: '+7 (999) 555-33-22',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  },
];

const districts = [
  { key: 'nearby', label: 'Ближайшие 3 км' },
  { key: 'vahitovsky', label: 'Вахитовский район' },
];

export default function RentalsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [district, setDistrict] = useState<'nearby' | 'vahitovsky'>('nearby');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const filteredRentals = useMemo(() => {
    let result = rentals.filter(r =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (district === 'vahitovsky') {
      result = result.filter(r => r.id !== '2');
    }
    return result;
  }, [searchQuery, district]);

  const currentDistrict = districts.find(d => d.key === district)?.label || '';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Аренда квартир</Text>
        <Pressable onPress={() => router.push('/rentals/add')} style={styles.addButton}>
          <Plus size={24} color="#0891b2" />
        </Pressable>
      </View>
      <View style={styles.dropdownWrapper}>
        <Pressable
          style={styles.dropdownLabelRow}
          onPress={() => setDropdownOpen(open => !open)}
        >
          <Text style={styles.dropdownLabel}>{currentDistrict}</Text>
          <ChevronRight size={16} color="#94a3b8" style={{ transform: [{ rotate: dropdownOpen ? '90deg' : '0deg' }] }} />
        </Pressable>
        {dropdownOpen && (
          <View style={styles.dropdownList}>
            {districts.map(d => (
              <Pressable
                key={d.key}
                style={styles.dropdownItem}
                onPress={() => {
                  setDistrict(d.key as 'nearby' | 'vahitovsky');
                  setDropdownOpen(false);
                }}
              >
                <Text style={[styles.dropdownItemText, d.key === district && { color: '#64748b' }]}>{d.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск квартир..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filteredRentals.length > 0 ? filteredRentals.map(rental => (
          <Pressable
            key={rental.id}
            style={styles.card}
            onPress={() => router.push(`/rentals/${rental.id}`)}
          >
            <Image source={{ uri: rental.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{rental.title}</Text>
              <Text style={styles.price}>{rental.price}</Text>
              <Text style={styles.description} numberOfLines={2}>{rental.description}</Text>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.detailText}>{rental.address}</Text>
              </View>
              <View style={styles.contactRow}>
                <Phone size={16} color="#0891b2" />
                <Text style={styles.contactText}>{rental.phone}</Text>
              </View>
            </View>
          </Pressable>
        )) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Квартиры не найдены</Text>
          </View>
        )}
      </ScrollView>
    </View>
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
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  addButton: {
    padding: 8,
  },
  dropdownWrapper: {
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  dropdownLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dropdownLabel: {
    color: '#94a3b8',
    fontSize: 16,
    flex: 1,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#0f172a',
  },
  searchInputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#0f172a',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 16,
    marginRight: 12,
  },
  info: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0891b2',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  contactText: {
    fontSize: 14,
    color: '#0891b2',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
  },
}); 