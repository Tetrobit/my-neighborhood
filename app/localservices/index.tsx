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
  ImageErrorEventData,
  NativeSyntheticEvent,
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
  Briefcase,
  ChevronRight,
} from 'lucide-react-native';
import { LOCAL_SERVICES, LOCAL_SERVICE_CATEGORIES, DEFAULT_IMAGE, getValidImageUrl } from '../data/businesses';

type Service = typeof LOCAL_SERVICES[0];

// Выносим карточку услуги в отдельный компонент
const ServiceCard = ({ item, onPress }: { item: Service; onPress: () => void }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };
  
  const imageUrl = imageError ? DEFAULT_IMAGE : getValidImageUrl(item.image);
  
  return (
    <Pressable
      style={styles.serviceCard}
      onPress={onPress}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.serviceImage}
        onError={handleImageError}
      />
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
            <Text style={styles.serviceAddress} numberOfLines={1}>
              {item.address}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function LocalServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState(LOCAL_SERVICES);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [filter, setFilter] = useState<'nearby' | 'district'>('nearby');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  // Фильтрация по району
  const displayedServices = filter === 'nearby'
    ? filteredServices
    : filteredServices.slice(0, 5);
  const filterLabel = filter === 'nearby' ? 'Ближайшие 3 км' : 'Вахитовский район';

  // Обновленная функция рендеринга карточки
  const renderServiceCard = ({ item }: { item: Service }) => (
    <ServiceCard 
      item={item} 
      onPress={() => handleServicePress(item)} 
    />
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Местные службы</Text>
      </View>

      {/* Фильтр выбора района */}
      <View style={{marginTop: 8, minHeight: 24, marginLeft: 16}}>
        <Pressable onPress={() => setDropdownOpen(open => !open)} style={styles.dropdownLabelRow}>
          <Text style={styles.dropdownLabel}>{filterLabel}</Text>
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
          data={displayedServices}
          renderItem={renderServiceCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
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
    marginBottom: 12,
    height: 140,
  },
  serviceImage: {
    width: 120,
    height: 140,
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
    marginBottom: 4,
    flexShrink: 1,
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
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 3,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceAddress: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
    flex: 1,
  },
  priceContainer: {
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  servicePrice: {
    fontSize: 15,
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
  dropdownLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    marginTop: 0,
    gap: 4,
    minHeight: 24,
  },
  dropdownLabel: {
    color: '#94a3b8',
    fontWeight: '400',
    fontSize: 15,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 24,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: 'flex-start',
    minWidth: 160,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownItemActive: {
    backgroundColor: '#e0f2fe',
  },
  dropdownItemText: {
    color: '#0f172a',
    fontSize: 15,
  },
  dropdownItemTextActive: {
    color: '#0891b2',
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 16,
  },
}); 