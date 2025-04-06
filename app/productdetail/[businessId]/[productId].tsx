import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Animated,
  NativeSyntheticEvent,
  ImageErrorEventData,
  SafeAreaView,
  Share,
  Linking,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ChevronLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  Calendar,
  ShoppingBag,
  Share2,
} from 'lucide-react-native';
import { BUSINESSES_BY_ID, DEFAULT_IMAGE, getValidImageUrl } from '../../data/businesses';

export default function ProductDetailScreen() {
  const { businessId, productId } = useLocalSearchParams<{ businessId: string, productId: string }>();
  const business = BUSINESSES_BY_ID[businessId as string];
  const product = business?.products?.find(p => p.id === productId);
  const [imageError, setImageError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };

  const handleCall = () => {
    if (business?.phone) {
      Linking.openURL(`tel:${business.phone}`);
    }
  };

  const handleShare = async () => {
    if (product) {
      try {
        await Share.share({
          message: `Посмотрите товар "${product.name}" за ${product.price} от ${business?.name}`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!business || !product) {
    return (
      <View style={styles.container}>
        <Text>Товар не найден</Text>
      </View>
    );
  }

  const imageUrl = imageError ? DEFAULT_IMAGE : (product.image ? product.image : DEFAULT_IMAGE);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#0f172a" />
          </Pressable>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
            <Text style={styles.businessName} numberOfLines={1}>{business.name}</Text>
          </View>
          <Pressable onPress={handleShare} style={styles.shareButton}>
            <Share2 size={24} color="#64748b" />
          </Pressable>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.productImage}
            onError={handleImageError}
          />
          
          <View style={styles.productContent}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{product.price}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {business.subcategory ? 
                    (business.subcategory.charAt(0).toUpperCase() + business.subcategory.slice(1)) : 
                    business.category}
                </Text>
              </View>
            </View>
            
            <Text style={styles.productName}>{product.name}</Text>
            
            <View style={styles.separator} />
            
            <Text style={styles.sectionTitle}>О продавце</Text>
            <View style={styles.businessInfo}>
              <View style={styles.businessRating}>
                <Star size={18} color="#FFB800" fill="#FFB800" />
                <Text style={styles.ratingText}>{business.rating} ({business.reviewCount} отзывов)</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MapPin size={18} color="#64748b" />
                <Text style={styles.infoText}>{business.address}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Clock size={18} color="#64748b" />
                <Text style={styles.infoText}>{business.openHours}</Text>
              </View>
              
              <Pressable style={styles.infoRow} onPress={handleCall}>
                <Phone size={18} color="#64748b" />
                <Text style={[styles.infoText, styles.phoneText]}>{business.phone}</Text>
              </Pressable>
            </View>
            
            {business.description && (
              <>
                <View style={styles.separator} />
                <Text style={styles.sectionTitle}>Описание</Text>
                <Text style={styles.descriptionText}>{business.description}</Text>
              </>
            )}
            
            {business.products && business.products.length > 1 && (
              <>
                <View style={styles.separator} />
                <Text style={styles.sectionTitle}>Другие товары продавца</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedProducts}>
                  {business.products
                    .filter(p => p.id !== product.id)
                    .slice(0, 5)
                    .map(relatedProduct => (
                      <Pressable 
                        key={relatedProduct.id} 
                        style={styles.relatedProductItem}
                        onPress={() => router.push(`/productdetail/${businessId}/${relatedProduct.id}` as any)}
                      >
                        <Image 
                          source={{ uri: relatedProduct.image || DEFAULT_IMAGE }} 
                          style={styles.relatedProductImage}
                        />
                        <View style={styles.relatedProductContent}>
                          <Text style={styles.relatedProductName} numberOfLines={2}>{relatedProduct.name}</Text>
                          <Text style={styles.relatedProductPrice}>{relatedProduct.price}</Text>
                        </View>
                      </Pressable>
                    ))
                  }
                </ScrollView>
              </>
            )}
          </View>
        </ScrollView>

        <SafeAreaView style={styles.footer}>
          <View style={styles.footerButtonsContainer}>
            <Pressable style={styles.callButton} onPress={handleCall}>
              <Phone size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Связаться</Text>
            </Pressable>
            <Pressable 
              style={styles.viewBusinessButton}
              onPress={() => router.push(`/business/${businessId}` as any)}
            >
              <ShoppingBag size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Все товары</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Animated.View>
    </SafeAreaView>
  );
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
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  businessName: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  shareButton: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  productContent: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0891b2',
  },
  categoryBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0891b2',
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
    lineHeight: 26,
  },
  separator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  businessInfo: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
  },
  businessRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    color: '#0f172a',
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 10,
    flex: 1,
  },
  phoneText: {
    color: '#0891b2',
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  relatedProducts: {
    marginTop: 12,
  },
  relatedProductItem: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  relatedProductImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  relatedProductContent: {
    padding: 8,
  },
  relatedProductName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
    height: 36,
  },
  relatedProductPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891b2',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0891b2',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
  },
  viewBusinessButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
}); 