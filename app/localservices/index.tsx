import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import {
  ChevronLeft,
  Search,
  Star,
  Filter,
  MapPin,
  X,
  LucideIcon,
} from 'lucide-react-native';
import { LOCAL_SERVICES, LOCAL_SERVICE_CATEGORIES } from '../data/businesses';

type Service = typeof LOCAL_SERVICES[0];

export default function LocalServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState(LOCAL_SERVICES);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchQuery, selectedCategory]);

  const filterServices = () => {
    let filtered = LOCAL_SERVICES;

    if (selectedCategory) {
      filtered = filtered.filter(service => service.subcategory === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        service =>
          service.name.toLowerCase().includes(query) ||
          service.description?.toLowerCase().includes(query)
      );
    }

    setFilteredServices(filtered);
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleServicePress = (service: Service) => {
    router.push(`/business/${service.id}`);
  };

  const renderServiceCard = ({ item }: { item: Service }) => (
    <Pressable
      style={styles.serviceCard}
      onPress={() => handleServicePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceContent}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFB800" fill="#FFB800" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
        </View>
        <Text style={styles.serviceCategory}>
          {LOCAL_SERVICE_CATEGORIES.find(cat => cat.id === item.subcategory)?.name}
        </Text>
        <View style={styles.serviceDetails}>
          <MapPin size={14} color="#64748b" />
          <Text style={styles.serviceAddress}>{item.address}</Text>
        </View>
        <Text style={styles.servicePrice}>{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Местные службы</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Найти услуги..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <Pressable onPress={clearSearch}>
              <X size={20} color="#64748b" />
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {LOCAL_SERVICE_CATEGORIES.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.categoryButtonTextActive,
              ]}
              numberOfLines={1}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={filteredServices}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.servicesContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Услуги не найдены</Text>
          </View>
        }
      />
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#0f172a',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    height: 60,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  categoryButtonActive: {
    backgroundColor: '#0891b2',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  servicesContainer: {
    padding: 16,
    gap: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 16,
  },
  serviceImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  serviceContent: {
    flex: 1,
    padding: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    marginLeft: 4,
    marginRight: 2,
  },
  reviewCount: {
    fontSize: 12,
    color: '#64748b',
  },
  serviceCategory: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceAddress: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891b2',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
  },
}); 