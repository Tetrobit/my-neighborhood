import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Linking,
  Alert,
  Animated,
  ImageErrorEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Star,
  MapPin,
  Phone,
  Calendar,
  Clock,
  MapIcon,
} from 'lucide-react-native';
import { EVENTS, EVENT_CATEGORIES, DEFAULT_IMAGE, getValidImageUrl } from '../data/businesses';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = EVENTS.find(event => event.id === id);
  const [imageError, setImageError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Мероприятие не найдено</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Вернуться назад</Text>
        </Pressable>
      </View>
    );
  }

  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };

  const imageUrl = imageError ? DEFAULT_IMAGE : getValidImageUrl(event.image);

  // Форматирование цены
  const formatPrice = (price: string | undefined): string => {
    if (!price) return 'Бесплатно';
    
    // Если цена содержит слово "бесплатно" (регистр не важен)
    if (price.toLowerCase().includes('бесплатно')) {
      return 'Бесплатно';
    }
    
    // Если цена имеет формат "X руб за Y, Z бесплатно"
    if (price.includes('руб') && price.includes('бесплатно')) {
      return price.replace('руб', '₽');
    }
    
    // Простая замена "руб" на символ рубля
    return price.replace('руб', '₽');
  };

  const handleCallOrganizer = () => {
    Linking.openURL(`tel:${event.phone}`);
  };

  const handleShowOnMap = () => {
    Alert.alert(
      "Показать на карте",
      `Функция отображения "${event.name}" на карте будет доступна в ближайшее время.`,
      [{ text: "ОК", onPress: () => console.log("OK Pressed") }]
    );
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {event.name}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.eventImage}
          onError={handleImageError}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.eventName}>{event.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={20} color="#FFB800" fill="#FFB800" />
            <Text style={styles.rating}>{event.rating}</Text>
            <Text style={styles.reviewCount}>({event.reviewCount} отзывов)</Text>
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.category}>
              {EVENT_CATEGORIES.find(cat => cat.id === event.subcategory)?.name}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Calendar size={20} color="#64748b" />
              <Text style={styles.infoText}>{event.openHours}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MapPin size={20} color="#64748b" />
              <Text style={styles.infoText}>{event.address}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Phone size={20} color="#64748b" />
              <Text style={styles.infoText}>{event.phone}</Text>
            </View>

            {event.price && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Стоимость:</Text>
                <Text style={styles.priceValue}>{formatPrice(event.price)}</Text>
              </View>
            )}
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Описание</Text>
            <Text style={styles.descriptionText}>{event.description}</Text>
          </View>

          <View style={styles.actionButtonsContainer}>
            <Pressable 
              style={styles.contactButton}
              onPress={handleCallOrganizer}
            >
              <Phone size={20} color="#ffffff" />
              <Text style={styles.contactButtonText}>Связаться с организатором</Text>
            </Pressable>
            
            <Pressable 
              style={styles.mapButton}
              onPress={handleShowOnMap}
            >
              <MapIcon size={20} color="#ffffff" />
              <Text style={styles.mapButtonText}>Показать на карте</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 8,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  eventImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  eventName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  reviewCount: {
    marginLeft: 2,
    fontSize: 16,
    color: '#64748b',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    color: '#0ea5e9',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginRight: 8,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#0f172a',
    lineHeight: 24,
  },
  actionButtonsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
  mapButton: {
    backgroundColor: '#64748b',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
  backButtonText: {
    color: '#0ea5e9',
    fontSize: 16,
    fontWeight: '500',
  },
}); 