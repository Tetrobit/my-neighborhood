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
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import {
  ChevronLeft,
  Search,
  Star,
  Calendar,
  MapPin,
  X,
  LucideIcon,
  Phone,
  MapIcon,
  Plus,
  Music,
  GraduationCap,
  Bike,
  Theater,
  Heart,
  Users,
  Baby,
  Ellipsis,
  Clock,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { EVENTS, EVENT_CATEGORIES, DEFAULT_IMAGE, getValidImageUrl } from '../data/businesses';

type Event = typeof EVENTS[0];

// Компонент карточки мероприятия
const EventCard = ({ item, onPress }: { item: Event; onPress: () => void }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };
  
  const imageUrl = imageError ? DEFAULT_IMAGE : getValidImageUrl(item.image);
  
  // Форматирование цены (например, "500 руб" -> "500 ₽")
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
  
  return (
    <Pressable
      style={styles.eventCard}
      onPress={onPress}
    >
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.eventImage}
        onError={handleImageError}
      />
      <View style={styles.eventContent}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventName} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFB800" fill="#FFB800" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
          <Text style={styles.eventCategory} numberOfLines={1} ellipsizeMode="tail">
            {EVENT_CATEGORIES.find(cat => cat.id === item.subcategory)?.name}
          </Text>
          <View style={styles.eventTimeContainer}>
            <Clock size={14} color="#64748b" />
            <Text style={styles.eventTime} numberOfLines={1} ellipsizeMode="tail">{item.openHours}</Text>
          </View>
          <View style={styles.eventDetails}>
            <MapPin size={14} color="#64748b" />
            <Text style={styles.eventAddress} numberOfLines={1} ellipsizeMode="tail">
              {item.address}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.eventPrice} numberOfLines={1} ellipsizeMode="tail">{formatPrice(item.price)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

// Компонент для детальной информации о мероприятии
const EventDetailModal = ({ visible, event, onClose }: { visible: boolean; event: Event | null; onClose: () => void }) => {
  if (!event) return null;
  
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };
  
  const imageUrl = imageError ? DEFAULT_IMAGE : getValidImageUrl(event.image);
  
  // Форматирование цены (например, "500 руб" -> "500 ₽")
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
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.detailModalOverlay}>
        <View style={styles.detailModalContainer}>
          <View style={styles.detailModalHeader}>
            <Text style={styles.detailModalTitle}>{event.name}</Text>
            <Pressable onPress={onClose}>
              <X size={24} color="#0f172a" />
            </Pressable>
          </View>
          
          <ScrollView style={styles.detailModalContent}>
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.detailModalImage}
              onError={handleImageError}
            />
            
            <View style={styles.detailSection}>
              <View style={styles.detailRatingContainer}>
                <Star size={20} color="#FFB800" fill="#FFB800" />
                <Text style={styles.detailRating}>{event.rating}</Text>
                <Text style={styles.detailReviewCount}>({event.reviewCount})</Text>
              </View>
              
              <View style={styles.detailCategoryContainer}>
                <Text style={styles.detailCategory}>
                  {EVENT_CATEGORIES.find(cat => cat.id === event.subcategory)?.name}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailSection}>
              <View style={styles.detailRow}>
                <Clock size={18} color="#64748b" />
                <Text style={styles.detailRowText}>{event.openHours}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <MapPin size={18} color="#64748b" />
                <Text style={styles.detailRowText}>{event.address}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Phone size={18} color="#64748b" />
                <Text style={styles.detailRowText}>{event.phone}</Text>
              </View>
              
              {event.price && (
                <View style={styles.detailPriceContainer}>
                  <Text style={styles.detailPrice}>{formatPrice(event.price)}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Описание</Text>
              <Text style={styles.detailDescription}>{event.description}</Text>
            </View>
            
            <View style={styles.detailActionButtons}>
              <Pressable 
                style={styles.detailContactButton}
                onPress={() => Linking.openURL(`tel:${event.phone}`)}
              >
                <Phone size={20} color="#ffffff" />
                <Text style={styles.detailContactButtonText}>Связаться с организатором</Text>
              </Pressable>
              
              <Pressable 
                style={styles.detailMapButton}
                onPress={() => Alert.alert(
                  "Показать на карте",
                  `Функция отображения "${event.name}" на карте будет доступна в ближайшее время.`,
                  [{ text: "ОК", onPress: () => console.log("OK Pressed") }]
                )}
              >
                <MapIcon size={20} color="#ffffff" />
                <Text style={styles.detailMapButtonText}>Показать на карте</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function EventsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState(EVENTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [createSuccess, setCreateSuccess] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Состояние для формы создания мероприятия
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    image: DEFAULT_IMAGE,
    date: new Date(),
    time: new Date(),
    address: '',
    phone: '',
    category: 'other',
    price: '',
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, selectedCategory]);

  const filterEvents = () => {
    let filtered = EVENTS;

    if (selectedCategory) {
      filtered = filtered.filter(event => event.subcategory === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        event =>
          event.name.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query)
      );
    }

    setFilteredEvents(filtered);
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleEventPress = (event: Event) => {
    // Вместо Alert, открываем модальное окно с подробной информацией
    setSelectedEvent(event);
  };

  const handleCallOrganizer = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleShowOnMap = (event: Event) => {
    Alert.alert(
      "Показать на карте",
      `Функция отображения "${event.name}" на карте будет доступна в ближайшее время.`,
      [
        { text: "ОК", onPress: () => console.log("OK Pressed") }
      ]
    );
  };

  const handleCreateEvent = () => {
    // Проверка введенных данных
    if (!newEvent.name || !newEvent.description || !newEvent.address || !newEvent.phone) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все обязательные поля");
      return;
    }

    // Здесь бы отправили данные на сервер, но для демонстрации просто закрываем модальное окно
    setModalVisible(false);
    
    // Показываем сообщение об успешном создании
    setCreateSuccess(true);
    
    // Через 3 секунды скрываем сообщение об успехе
    setTimeout(() => {
      setCreateSuccess(false);
      
      // Сбрасываем форму
      setNewEvent({
        name: '',
        description: '',
        image: DEFAULT_IMAGE,
        date: new Date(),
        time: new Date(),
        address: '',
        phone: '',
        category: 'other',
        price: '',
      });
    }, 3000);
  };

  const pickImage = async () => {
    // Запрашиваем разрешение на доступ к галерее
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Требуется разрешение", "Необходим доступ к галерее для выбора изображения");
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setNewEvent({...newEvent, image: result.assets[0].uri});
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || newEvent.date;
    setShowDatePicker(Platform.OS === 'ios');
    setNewEvent({...newEvent, date: currentDate});
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || newEvent.time;
    setShowTimePicker(Platform.OS === 'ios');
    setNewEvent({...newEvent, time: currentTime});
  };

  const getIconForCategory = (categoryId: string): LucideIcon => {
    switch (categoryId) {
      case 'entertainment': return Music;
      case 'education': return GraduationCap;
      case 'sport': return Bike;
      case 'culture': return Theater;
      case 'charity': return Heart;
      case 'networking': return Users;
      case 'kids': return Baby;
      case 'other': return Ellipsis;
      default: return Calendar;
    }
  };

  // Рендер карточки мероприятия с кнопками
  const renderEventCard = ({ item }: { item: Event }) => (
    <View style={styles.eventCardWrapper}>
      <EventCard 
        item={item} 
        onPress={() => handleEventPress(item)} 
      />
      <View style={styles.eventActions}>
        <Pressable 
          style={styles.contactButton}
          onPress={() => handleCallOrganizer(item.phone)}
        >
          <Phone size={18} color="#ffffff" />
          <Text style={styles.contactButtonText}>Связаться с организатором</Text>
        </Pressable>
        <Pressable 
          style={styles.mapButton}
          onPress={() => handleShowOnMap(item)}
        >
          <MapIcon size={18} color="#ffffff" />
          <Text style={styles.mapButtonText}>Показать на карте</Text>
        </Pressable>
      </View>
    </View>
  );

  // Форматируем дату и время для отображения
  const formatDateTime = (date: Date, time: Date) => {
    const formattedDate = date.toLocaleDateString('ru-RU');
    const formattedTime = time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Мероприятия</Text>
        <Pressable 
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={24} color="#0f172a" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#64748b" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Найти мероприятие..."
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
            {EVENT_CATEGORIES.map((category) => {
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
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.eventsContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          ListHeaderComponent={<View style={styles.listHeaderSpacer} />}
          ListFooterComponent={<View style={styles.listFooterSpacer} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Мероприятия не найдены</Text>
            </View>
          }
        />
      </View>

      {/* Модальное окно для создания мероприятия */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Создать мероприятие</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <X size={24} color="#0f172a" />
              </Pressable>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <Text style={styles.inputLabel}>Название мероприятия*</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Введите название"
                value={newEvent.name}
                onChangeText={(text) => setNewEvent({...newEvent, name: text})}
              />
              
              <Text style={styles.inputLabel}>Описание*</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Введите описание мероприятия"
                value={newEvent.description}
                onChangeText={(text) => setNewEvent({...newEvent, description: text})}
                multiline={true}
                numberOfLines={4}
              />
              
              <Text style={styles.inputLabel}>Изображение</Text>
              <Pressable 
                style={styles.imagePicker}
                onPress={pickImage}
              >
                {newEvent.image ? (
                  <Image source={{ uri: newEvent.image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>Добавить изображение</Text>
                  </View>
                )}
              </Pressable>
              
              <Text style={styles.inputLabel}>Категория</Text>
              <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryPickerContainer}
              >
                {EVENT_CATEGORIES.map((category) => (
                  <Pressable
                    key={category.id}
                    style={[
                      styles.categoryPickerItem,
                      newEvent.category === category.id && styles.categoryPickerItemActive,
                    ]}
                    onPress={() => setNewEvent({...newEvent, category: category.id})}
                  >
                    <Text 
                      style={[
                        styles.categoryPickerText,
                        newEvent.category === category.id && styles.categoryPickerTextActive,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              
              <Text style={styles.inputLabel}>Дата*</Text>
              <Pressable 
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {newEvent.date.toLocaleDateString('ru-RU')}
                </Text>
                <Calendar size={20} color="#64748b" />
              </Pressable>
              
              {showDatePicker && (
                <DateTimePicker
                  value={newEvent.date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
              
              <Text style={styles.inputLabel}>Время*</Text>
              <Pressable 
                style={styles.datePickerButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateText}>
                  {newEvent.time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Clock size={20} color="#64748b" />
              </Pressable>
              
              {showTimePicker && (
                <DateTimePicker
                  value={newEvent.time}
                  mode="time"
                  display="default"
                  onChange={onChangeTime}
                />
              )}
              
              <Text style={styles.inputLabel}>Адрес*</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Введите адрес проведения"
                value={newEvent.address}
                onChangeText={(text) => setNewEvent({...newEvent, address: text})}
              />
              
              <Text style={styles.inputLabel}>Телефон организатора*</Text>
              <TextInput
                style={styles.textInput}
                placeholder="+7 (___) ___-__-__"
                value={newEvent.phone}
                onChangeText={(text) => setNewEvent({...newEvent, phone: text})}
                keyboardType="phone-pad"
              />
              
              <Text style={styles.inputLabel}>Стоимость участия</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Введите стоимость или 'бесплатно'"
                value={newEvent.price}
                onChangeText={(text) => setNewEvent({...newEvent, price: text})}
              />
              
              <Pressable 
                style={styles.createEventButton}
                onPress={handleCreateEvent}
              >
                <Text style={styles.createEventButtonText}>Создать мероприятие</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      {/* Уведомление об успешном создании */}
      {createSuccess && (
        <View style={styles.successNotification}>
          <Text style={styles.successText}>Мероприятие успешно создано!</Text>
        </View>
      )}

      {/* Модальное окно с детальной информацией о выбранном мероприятии */}
      <EventDetailModal 
        visible={selectedEvent !== null}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 2,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  createButton: {
    padding: 8,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
  categoriesWrapper: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoriesContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#0ea5e9',
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  listHeaderSpacer: {
    height: 8,
  },
  listFooterSpacer: {
    height: 20,
  },
  eventsContainer: {
    paddingHorizontal: 16,
  },
  eventCardWrapper: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '100%',
  },
  eventCard: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 12,
    flexDirection: 'row',
    width: '100%',
  },
  eventInfo: {
    flex: 1,
    width: '80%',
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
    flexShrink: 1,
    width: '100%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  reviewCount: {
    marginLeft: 2,
    fontSize: 14,
    color: '#64748b',
  },
  eventCategory: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTime: {
    marginLeft: 6,
    fontSize: 14,
    color: '#0f172a',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventAddress: {
    marginLeft: 6,
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  priceContainer: {
    justifyContent: 'center',
    paddingLeft: 12,
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  eventActions: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  contactButton: {
    flex: 1,
    backgroundColor: '#0ea5e9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  contactButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    marginLeft: 6,
  },
  mapButton: {
    flex: 1,
    backgroundColor: '#64748b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    marginLeft: 6,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
  },
  // Стили для модального окна
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  modalContent: {
    padding: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 6,
    marginTop: 12,
  },
  textInput: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#0f172a',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#64748b',
  },
  categoryPickerContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  categoryPickerItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryPickerItemActive: {
    backgroundColor: '#0ea5e9',
  },
  categoryPickerText: {
    color: '#64748b',
    fontWeight: '500',
  },
  categoryPickerTextActive: {
    color: '#ffffff',
  },
  datePickerButton: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#0f172a',
  },
  createEventButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  createEventButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Стили для уведомления об успехе
  successNotification: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  successText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  // Стили для модального окна с деталями мероприятия
  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailModalContainer: {
    width: '92%',
    maxHeight: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  detailModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  detailModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
    marginRight: 16,
  },
  detailModalContent: {
    flex: 1,
  },
  detailModalImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  detailSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  detailRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailRating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  detailReviewCount: {
    marginLeft: 2,
    fontSize: 16,
    color: '#64748b',
  },
  detailCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailCategory: {
    fontSize: 16,
    color: '#0ea5e9',
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailRowText: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
    flex: 1,
  },
  detailPriceContainer: {
    marginTop: 4,
  },
  detailPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 16,
    color: '#0f172a',
    lineHeight: 24,
  },
  detailActionButtons: {
    padding: 16,
    gap: 12,
  },
  detailContactButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContactButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
  detailMapButton: {
    backgroundColor: '#64748b',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailMapButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
}); 