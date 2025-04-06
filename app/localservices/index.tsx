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
  Droplet,
  Hammer,
  Sparkles,
  Wrench,
  Zap,
  Truck,
  Baby,
  Flower,
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

  const getIconForCategory = (categoryId: string): LucideIcon => {
    switch (categoryId) {
      case 'plumbing': return Droplet;
      case 'repair': return Hammer;
      case 'cleaning': return Sparkles;
      case 'handyman': return Wrench;
      case 'electric': return Zap;
      case 'delivery': return Truck;
      case 'babysitting': return Baby;
      case 'gardening': return Flower;
      default: return Wrench;
    }
  };

  const renderServiceCard = ({ item }: { item: Service }) => (
    <Pressable
      style={styles.serviceCard}
      onPress={() => handleServicePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceContent}>
        <View style={styles.serviceInfo}>
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
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
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

      <View style={styles.content}>
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

        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {LOCAL_SERVICE_CATEGORIES.map((category) => {
              const IconComponent = getIconForCategory(category.id);
              return (
                <Pressable
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.categoryButtonActive,
                  ]}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <IconComponent 
                    size={16} 
                    color={selectedCategory === category.id ? '#ffffff' : '#64748b'} 
                    style={styles.categoryIcon}
                  />
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
              );
            })}
          </ScrollView>
        </View>

        <FlatList
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          ListHeaderComponent={<View style={styles.listHeaderSpacer} />}
          ListFooterComponent={<View style={styles.listFooterSpacer} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Услуги не найдены</Text>
            </View>
          }
        />
      </View>
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
    paddingTop: 50,
    paddingBottom: 12,
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
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
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
  categoriesWrapper: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    height: 48,
    zIndex: 10,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    height: 32,
    flexDirection: 'row',
  },
  categoryButtonActive: {
    backgroundColor: '#0891b2',
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  servicesContainer: {
    paddingHorizontal: 16,
  },
  listHeaderSpacer: {
    height: 4,
  },
  listFooterSpacer: {
    height: 8,
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
    marginBottom: 10,
    height: 150,
  },
  serviceImage: {
    width: 130,
    height: 150,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  serviceContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
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
    marginBottom: 4,
  },
  serviceAddress: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  priceContainer: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
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