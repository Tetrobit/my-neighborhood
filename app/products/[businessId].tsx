import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  ImageErrorEventData,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ChevronLeft,
  Star,
  Search,
  X,
  ShoppingBag,
} from 'lucide-react-native';
import { BUSINESSES_BY_ID, DEFAULT_IMAGE, getValidImageUrl } from '../data/businesses';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - 48) / COLUMN_COUNT;

type Product = {
  id: string;
  name: string;
  price: string;
  image?: string;
  description?: string;
};

const ProductItem = ({ product, businessId }: { product: Product, businessId: string }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };
  
  const imageUrl = imageError ? DEFAULT_IMAGE : (product.image ? product.image : DEFAULT_IMAGE);
  
  const handleProductPress = () => {
    router.push(`/productdetail/${businessId}/${product.id}` as any);
  };
  
  return (
    <Pressable 
      style={styles.productItem}
      onPress={handleProductPress}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.productImage}
        onError={handleImageError}
      />
      <View style={styles.productContent}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </Pressable>
  );
};

export default function ProductsScreen() {
  const { businessId } = useLocalSearchParams<{ businessId: string }>();
  const business = BUSINESSES_BY_ID[businessId as string];
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(business?.products || []);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (business?.products) {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        setFilteredProducts(
          business.products.filter(product => 
            product.name.toLowerCase().includes(query)
          )
        );
      } else {
        setFilteredProducts(business.products);
      }
    }
  }, [searchQuery, business]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleBackPress = () => {
    router.push(`/business/${businessId}` as any);
  };

  if (!business || !business.products) {
    return (
      <View style={styles.container}>
        <Text>Продукты не найдены</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Pressable onPress={handleBackPress} style={styles.backButton}>
            <ChevronLeft size={24} color="#0f172a" />
          </Pressable>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Ассортимент</Text>
            <Text style={styles.businessName}>{business.name}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ShoppingBag size={18} color="#0891b2" />
            <Text style={styles.statText}>
              {business.products.length} {getProductsCount(business.products.length)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Star size={18} color="#FFB800" fill="#FFB800" />
            <Text style={styles.statText}>{business.rating} ({business.reviewCount})</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#64748b" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск товаров..."
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

        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductItem product={item} businessId={businessId as string} />}
          keyExtractor={(item) => item.id}
          numColumns={COLUMN_COUNT}
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Товары не найдены</Text>
            </View>
          }
        />
      </Animated.View>
    </SafeAreaView>
  );
}

function getProductsCount(count: number): string {
  if (count === 1) return 'товар';
  if (count >= 2 && count <= 4) return 'товара';
  return 'товаров';
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  businessName: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
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
  productsContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  productItem: {
    width: ITEM_WIDTH,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: ITEM_WIDTH,
    resizeMode: 'cover',
  },
  productContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
    minHeight: 40,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0891b2',
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
}); 