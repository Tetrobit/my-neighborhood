import { View, Text, ScrollView, StyleSheet, Pressable, Image, Linking, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { Phone, MapPin, MessageCircle, ArrowLeft, Plus, Search, Filter } from 'lucide-react-native';
import { useState, useMemo } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  address: string;
  phone: string;
  image: string;
  category: string;
}

const categories = [
  'Все',
  'Одежда',
  'Электроника',
  'Мебель',
  'Книги',
  'Спорт',
  'Детские товары',
  'Другое'
];

const products: Product[] = [
  {
    id: '1',
    title: 'Детский велосипед',
    description: 'Велосипед в хорошем состоянии, подходит для детей 5-8 лет',
    price: 'Бесплатно',
    address: 'ул. Ленина, 15',
    phone: '+7 (999) 123-45-67',
    image: 'https://images.unsplash.com/photo-1571333250630-f0230b59f5f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Детские товары',
  },
  {
    id: '2',
    title: 'Книжная полка',
    description: 'Деревянная книжная полка, хорошее состояние',
    price: 'Бесплатно',
    address: 'пр. Мира, 45',
    phone: '+7 (999) 765-43-21',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Мебель',
  },
  {
    id: '3',
    title: 'Настольная лампа',
    description: 'Современная LED лампа с регулировкой яркости',
    price: 'Бесплатно',
    address: 'ул. Пушкина, 10',
    phone: '+7 (999) 555-33-22',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Электроника',
  },
  {
    id: '4',
    title: 'Комнатные растения',
    description: 'Несколько горшков с неприхотливыми растениями',
    price: 'Бесплатно',
    address: 'пр. Победы, 78',
    phone: '+7 (999) 111-22-33',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Другое',
  },
  {
    id: '5',
    title: 'Футболка',
    description: 'Хлопковая футболка, размер M, хорошее состояние',
    price: 'Бесплатно',
    address: 'ул. Гагарина, 25',
    phone: '+7 (999) 222-33-44',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Одежда',
  },
  {
    id: '6',
    title: 'Смартфон',
    description: 'Старый смартфон, работает, но требует замены батареи',
    price: 'Бесплатно',
    address: 'пр. Ленина, 120',
    phone: '+7 (999) 444-55-66',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Электроника',
  },
  {
    id: '7',
    title: 'Кроссовки',
    description: 'Спортивные кроссовки, размер 42, мало ношенные',
    price: 'Бесплатно',
    address: 'ул. Советская, 15',
    phone: '+7 (999) 777-88-99',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Спорт',
  },
  {
    id: '8',
    title: 'Книги',
    description: 'Коллекция книг по программированию и дизайну',
    price: 'Бесплатно',
    address: 'пр. Мира, 78',
    phone: '+7 (999) 123-45-67',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Книги',
  },
];

export default function FreeMarketScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const handleMessage = (phone: string) => {
    Linking.openURL(`sms:${phone.replace(/\s/g, '')}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'Все' || 
        product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#0f172a" />
          </Pressable>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Фримаркет</Text>
          </View>
          <Pressable onPress={() => router.push('/freemarket/add')} style={styles.addButton}>
            <Plus size={24} color="#0891b2" />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Pressable 
                key={product.id} 
                style={styles.productCard}
                onPress={() => router.push(`/freemarket/${product.id}`)}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  
                  <View style={styles.productDetails}>
                    <View style={styles.detailRow}>
                      <MapPin size={16} color="#64748b" />
                      <Text style={styles.detailText}>{product.address}</Text>
                    </View>
                    
                    <View style={styles.contactButtons}>
                      <Pressable 
                        style={styles.contactButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleCall(product.phone);
                        }}
                      >
                        <Phone size={16} color="#0891b2" />
                        <Text style={styles.contactButtonText}>Позвонить</Text>
                      </Pressable>
                      
                      <Pressable 
                        style={styles.contactButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleMessage(product.phone);
                        }}
                      >
                        <MessageCircle size={16} color="#0891b2" />
                        <Text style={styles.contactButtonText}>Написать</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Товары не найдены</Text>
              <Text style={styles.emptyStateSubtext}>
                Попробуйте изменить параметры поиска или выберите другую категорию
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitles: {
    flex: 1,
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
  },
  addButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#0f172a',
  },
  categoriesContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#0891b2',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  productsGrid: {
    padding: 16,
    gap: 16,
  },
  productCard: {
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
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0891b2',
    marginBottom: 12,
  },
  productDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '500',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
}); 