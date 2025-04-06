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
  Linking,
  Alert,
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
  Cake,
  Cookie,
  ShoppingBag,
  Scissors,
  Flower,
  Shirt,
  Hammer,
  SprayCan,
  Phone,
  Map,
} from 'lucide-react-native';
import { SMALL_BUSINESSES, SMALL_BUSINESS_CATEGORIES, DEFAULT_IMAGE, getValidImageUrl } from '../data/businesses';

type Business = typeof SMALL_BUSINESSES[0];

// Выносим карточку бизнеса в отдельный компонент
const BusinessCard = ({ item, onPress }: { item: Business; onPress: () => void }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };
  
  const imageUrl = imageError ? DEFAULT_IMAGE : getValidImageUrl(item.image);
  
  return (
    <Pressable
      style={styles.businessCard}
      onPress={onPress}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.businessImage}
        onError={handleImageError}
      />
      <View style={styles.businessContent}>
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFB800" fill="#FFB800" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
          <Text style={styles.businessCategory}>
            {SMALL_BUSINESS_CATEGORIES.find(cat => cat.id === item.subcategory)?.name}
          </Text>
          <View style={styles.businessDetails}>
            <MapPin size={14} color="#64748b" />
            <Text style={styles.businessAddress} numberOfLines={1}>
              {item.address}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.businessPrice}>{item.price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function SmallBusinessScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState(SMALL_BUSINESSES);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    filterBusinesses();
  }, [searchQuery, selectedCategory]);

  const filterBusinesses = () => {
    let filtered = SMALL_BUSINESSES;

    if (selectedCategory) {
      filtered = filtered.filter(business => business.subcategory === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        business =>
          business.name.toLowerCase().includes(query) ||
          business.description?.toLowerCase().includes(query)
      );
    }

    setFilteredBusinesses(filtered);
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleBusinessPress = (business: Business) => {
    router.push(`/business/${business.id}`);
  };

  const handleCallBusiness = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleShowOnMap = (business: Business) => {
    Alert.alert(
      "Показать на карте",
      `Функция отображения "${business.name}" на карте будет доступна в ближайшее время.`,
      [
        { text: "ОК", onPress: () => console.log("OK Pressed") }
      ]
    );
  };

  const getIconForCategory = (categoryId: string): LucideIcon => {
    switch (categoryId) {
      case 'bakery': return Cake;
      case 'confectionery': return Cookie;
      case 'fruits': return ShoppingBag;
      case 'clothes': return Shirt;
      case 'handmade': return Scissors;
      case 'florist': return Flower;
      case 'cosmetics': return SprayCan;
      case 'crafts': return Hammer;
      default: return Hammer;
    }
  };

  // Обновленная функция рендеринга карточки с кнопками
  const renderBusinessCard = ({ item }: { item: Business }) => (
    <View style={styles.businessCardWrapper}>
      <BusinessCard 
        item={item} 
        onPress={() => handleBusinessPress(item)} 
      />
      <View style={styles.businessActions}>
        <Pressable 
          style={styles.contactButton}
          onPress={() => handleCallBusiness(item.phone)}
        >
          <Phone size={18} color="#ffffff" />
          <Text style={styles.contactButtonText}>Связаться</Text>
        </Pressable>
        <Pressable 
          style={styles.mapButton}
          onPress={() => handleShowOnMap(item)}
        >
          <Map size={18} color="#ffffff" />
          <Text style={styles.mapButtonText}>Показать на карте</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Малый бизнес</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#64748b" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Найти бизнес..."
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
            {SMALL_BUSINESS_CATEGORIES.map((category) => {
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
          data={filteredBusinesses}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.businessesContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          ListHeaderComponent={<View style={styles.listHeaderSpacer} />}
          ListFooterComponent={<View style={styles.listFooterSpacer} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Бизнесы не найдены</Text>
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
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
    paddingVertical: 4,
  },
  categoriesWrapper: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  categoriesContainer: {
    paddingVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  categoryButtonActive: {
    backgroundColor: '#0891b2',
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  businessCardWrapper: {
    marginBottom: 16,
  },
  businessCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  businessImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  businessContent: {
    padding: 12,
    flexDirection: 'row',
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
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
  },
  reviewCount: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 2,
  },
  businessCategory: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
  },
  businessDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessAddress: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
    flex: 1,
  },
  priceContainer: {
    marginLeft: 8,
  },
  businessPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891b2',
  },
  businessesContainer: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  listHeaderSpacer: {
    height: 8,
  },
  listFooterSpacer: {
    height: 32,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  businessActions: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    justifyContent: 'space-between',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0891b2',
    borderRadius: 8,
    paddingVertical: 10,
    flex: 1,
    marginRight: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 10,
    flex: 1,
    marginLeft: 8,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },
}); 