import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Linking,
  Modal,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ImageErrorEventData,
  NativeSyntheticEvent,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  Star,
  MapPin,
  Phone,
  Clock,
  ChevronLeft,
  Globe,
  Mail,
  Calendar,
  CheckCircle,
  X,
  Image as ImageIcon,
  Map,
  ChevronRight,
} from 'lucide-react-native';
import { BUSINESSES_BY_ID, DEFAULT_IMAGE, getValidImageUrl } from '../data/businesses';

// Константа для URL плейсхолдера
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/800x400/e2e8f0/64748b?text=Нет+изображения';

// Обновляем компонент для отображения товаров с функцией навигации
const ProductItem = ({ product, businessId }: { product: { id: string, name: string, price: string, image?: string }, businessId: string }) => {
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
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </Pressable>
  );
};

export default function BusinessScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const business = BUSINESSES_BY_ID[id];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Обработчик ошибки загрузки изображения
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };
  
  // Генерируем даты на неделю вперед
  const getDates = () => {
    const dates = [];
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        day: days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
        full: `${date.getDate()} ${months[date.getMonth()]}`
      });
    }
    
    return dates;
  };
  
  // Генерируем доступное время
  const getTimes = () => {
    const times = [];
    const [openHour, openMinute] = business.openHours.split(' - ')[0].split(':').map(Number);
    const [closeHour, closeMinute] = business.openHours.split(' - ')[1].split(':').map(Number);
    
    for (let h = openHour; h < closeHour; h += 1) {
      times.push(`${h.toString().padStart(2, '0')}:00`);
      if (h + 1 < closeHour) {
        times.push(`${h.toString().padStart(2, '0')}:30`);
      }
    }
    
    return times;
  };
  
  const dates = getDates();
  const times = getTimes();

  const handleSubmitRequest = () => {
    if (selectedDate && selectedTime) {
      // Здесь можно добавить логику отправки заявки
      setModalVisible(false);
      setSuccessModalVisible(true);
    } else {
      alert('Пожалуйста, выберите дату и время');
    }
  };

  if (!business) {
    return (
      <View style={styles.container}>
        <Text>Предприятие не найдено</Text>
      </View>
    );
  }

  // Получаем корректный URL изображения
  const imageUrl = imageError ? DEFAULT_IMAGE : getValidImageUrl(business.image);

  const handleCall = () => {
    Linking.openURL(`tel:${business.phone}`);
  };

  const handleEmail = () => {
    if (business.email) {
      Linking.openURL(`mailto:${business.email}`);
    }
  };

  const handleWebsite = () => {
    if (business.website) {
      Linking.openURL(`https://${business.website}`);
    }
  };

  // Обработчик для показа на карте
  const handleShowOnMap = () => {
    alert(`Показ на карте будет доступен в ближайшее время.\nАдрес: ${business.address}`);
  };

  // Добавляем функцию для просмотра всего ассортимента
  const handleViewAllProducts = (businessId: string) => {
    // Переходим на экран полного ассортимента
    router.push(`/products/${businessId}` as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/smallbusiness')} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>{business.name}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          onError={handleImageError}
        />

        <View style={styles.infoSection}>
          <View style={styles.ratingContainer}>
            <Star size={20} color="#FFB800" fill="#FFB800" />
            <Text style={styles.rating}>{business.rating}</Text>
            <Text style={styles.reviewCount}>({business.reviewCount} отзывов)</Text>
          </View>

          <Text style={styles.category}>{business.category}</Text>

          {business.description && (
            <Text style={styles.description}>{business.description}</Text>
          )}

          {business.price && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Цена:</Text>
              <Text style={styles.priceValue}>{business.price}</Text>
            </View>
          )}

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <MapPin size={20} color="#64748b" />
              <Text style={styles.detailText}>{business.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Clock size={20} color="#64748b" />
              <Text style={styles.detailText}>{business.openHours}</Text>
            </View>
            <Pressable onPress={handleCall} style={styles.detailRow}>
              <Phone size={20} color="#64748b" />
              <Text style={[styles.detailText, styles.link]}>{business.phone}</Text>
            </Pressable>
            {business.website && (
              <Pressable onPress={handleWebsite} style={styles.detailRow}>
                <Globe size={20} color="#64748b" />
                <Text style={[styles.detailText, styles.link]}>{business.website}</Text>
              </Pressable>
            )}
            {business.email && (
              <Pressable onPress={handleEmail} style={styles.detailRow}>
                <Mail size={20} color="#64748b" />
                <Text style={[styles.detailText, styles.link]}>{business.email}</Text>
              </Pressable>
            )}
          </View>

          {/* Изменяем секцию с товарами, добавляя стрелочку для просмотра всего ассортимента */}
          {business.products && business.products.length > 0 && (
            <View style={styles.productsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Товары</Text>
                <Pressable 
                  style={styles.viewAllButton} 
                  onPress={() => handleViewAllProducts(business.id)}
                >
                  <Text style={styles.viewAllText}>Весь ассортимент</Text>
                  <ChevronRight size={16} color="#0891b2" />
                </Pressable>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.productsContainer}>
                  {business.products.map(product => (
                    <ProductItem key={product.id} product={product} businessId={business.id} />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </View>

        {business.reviews && business.reviews.length > 0 && (
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Отзывы</Text>
            {business.reviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <View style={styles.reviewRating}>
                    <Star size={16} color="#FFB800" fill="#FFB800" />
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <SafeAreaView style={styles.footer}>
        {business.category === 'Малый бизнес' ? (
          <View style={styles.footerButtonsContainer}>
            <Pressable style={styles.callButton} onPress={handleCall}>
              <Phone size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Связаться</Text>
            </Pressable>
            <Pressable style={styles.mapButton} onPress={handleShowOnMap}>
              <Map size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Показать на карте</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.messageButton} onPress={() => setModalVisible(true)}>
            <Calendar size={20} color="#ffffff" />
            <Text style={styles.messageButtonText}>Подать заявку</Text>
          </Pressable>
        )}
      </SafeAreaView>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Выберите время</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#0f172a" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.dateContainer}>
              <Text style={styles.sectionTitle}>Дата</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {dates.map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateButton,
                      selectedDate === date.full && styles.selectedDateButton
                    ]}
                    onPress={() => setSelectedDate(date.full)}
                  >
                    <Text style={[
                      styles.dateDay,
                      selectedDate === date.full && styles.selectedDateText
                    ]}>
                      {date.day}
                    </Text>
                    <Text style={[
                      styles.dateNumber,
                      selectedDate === date.full && styles.selectedDateText
                    ]}>
                      {date.date}
                    </Text>
                    <Text style={[
                      styles.dateMonth,
                      selectedDate === date.full && styles.selectedDateText
                    ]}>
                      {date.month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.timeContainer}>
              <Text style={styles.sectionTitle}>Время</Text>
              <ScrollView style={{maxHeight: 200}}>
                <View style={styles.timeGrid}>
                  {times.map((time, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeButton,
                        selectedTime === time && styles.selectedTimeButton
                      ]}
                      onPress={() => setSelectedTime(time)}
                    >
                      <Text style={[
                        styles.timeText,
                        selectedTime === time && styles.selectedTimeText
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitRequest}
            >
              <Text style={styles.submitButtonText}>Отправить заявку</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContainer}>
            <CheckCircle size={60} color="#0891b2" style={styles.successIcon} />
            <Text style={styles.successTitle}>Запись подтверждена</Text>
            <Text style={styles.successMessage}>Сервис свяжется с вами для согласования</Text>
            <TouchableOpacity 
              style={styles.successButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.successButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    flex: 1,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  category: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#0f172a',
    lineHeight: 20,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0891b2',
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 12,
  },
  link: {
    color: '#0891b2',
    textDecorationLine: 'underline',
  },
  reviewsSection: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  reviewCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#0f172a',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0891b2',
    paddingVertical: 12,
    borderRadius: 8,
  },
  messageButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  dateContainer: {
    marginTop: 16,
  },
  dateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginRight: 12,
    borderRadius: 12,
    width: 80,
    backgroundColor: '#f1f5f9',
  },
  selectedDateButton: {
    backgroundColor: '#0891b2',
  },
  dateDay: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  dateMonth: {
    fontSize: 12,
    color: '#64748b',
  },
  selectedDateText: {
    color: '#ffffff',
  },
  timeContainer: {
    marginTop: 24,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  selectedTimeButton: {
    backgroundColor: '#0891b2',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  selectedTimeText: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successModalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '85%',
    maxWidth: 320,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  successButton: {
    backgroundColor: '#0891b2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  successButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Стили для отображения товаров
  productsSection: {
    marginTop: 16,
  },
  productsContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  productItem: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  productContent: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891b2',
  },
  
  // Стили для футера с кнопками
  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
  mapButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 4,
    flexShrink: 1,
    textAlign: 'center',
  },
  // Добавляем стили для заголовка секции с кнопкой "Весь ассортимент"
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#0891b2',
    marginRight: 4,
  },
}); 