import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { Link } from 'expo-router';
import { Search, Star, MapPin, Phone, Clock, ChevronRight } from 'lucide-react-native';

interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  address: string;
  openHours: string;
  phone: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

// Временные данные для демонстрации
const CATEGORIES: Category[] = [
  { id: '1', name: 'Рестораны', icon: '🍽️' },
  { id: '2', name: 'Магазины', icon: '🛍️' },
  { id: '3', name: 'Красота', icon: '💇‍♀️' },
  { id: '4', name: 'Здоровье', icon: '🏥' },
  { id: '5', name: 'Услуги', icon: '🔧' },
  { id: '6', name: 'Развлечения', icon: '🎮' },
];

const BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Кафе "У Дома"',
    category: 'Рестораны',
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
    address: 'ул. Примерная, 1',
    openHours: '09:00 - 22:00',
    phone: '+7 (999) 123-45-67',
  },
  {
    id: '2',
    name: 'Салон красоты "Элегант"',
    category: 'Красота',
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    address: 'ул. Центральная, 15',
    openHours: '10:00 - 20:00',
    phone: '+7 (999) 234-56-78',
  },
  // Добавьте больше бизнесов по необходимости
];

export default function CatalogScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBusinesses = BUSINESSES.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderBusinessCard = ({ item: business }: { item: Business }) => (
    <Link href={{ pathname: '/(tabs)/business/[id]', params: { id: business.id } }} asChild>
      <Pressable style={styles.businessCard}>
        <Image source={{ uri: business.image }} style={styles.businessImage} />
        <View style={styles.businessContent}>
          <View style={styles.businessHeader}>
            <Text style={styles.businessName}>{business.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFB800" fill="#FFB800" />
              <Text style={styles.rating}>{business.rating}</Text>
              <Text style={styles.reviewCount}>({business.reviewCount})</Text>
            </View>
          </View>
          
          <Text style={styles.category}>{business.category}</Text>
          
          <View style={styles.businessDetails}>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.detailText}>{business.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Clock size={16} color="#64748b" />
              <Text style={styles.detailText}>{business.openHours}</Text>
            </View>
            <View style={styles.detailRow}>
              <Phone size={16} color="#64748b" />
              <Text style={styles.detailText}>{business.phone}</Text>
            </View>
          </View>
        </View>
        <ChevronRight size={20} color="#64748b" style={styles.chevron} />
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Каталог</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#64748b" />
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск предприятий"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          <Pressable
            style={[
              styles.categoryButton,
              !selectedCategory && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[
              styles.categoryText,
              !selectedCategory && styles.categoryTextActive,
            ]}>Все</Text>
          </Pressable>
          {CATEGORIES.map(category => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={styles.categoryEmoji}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.name && styles.categoryTextActive,
              ]}>{category.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBusinesses}
        renderItem={renderBusinessCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.businessList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f1f5f9',
  },
  categoryButtonActive: {
    backgroundColor: '#0891b2',
  },
  categoryEmoji: {
    marginRight: 6,
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  businessList: {
    padding: 16,
  },
  businessCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  businessImage: {
    width: 100,
    height: '100%',
  },
  businessContent: {
    flex: 1,
    padding: 12,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 2,
  },
  category: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  businessDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 8,
  },
  chevron: {
    alignSelf: 'center',
    marginRight: 12,
  },
}); 