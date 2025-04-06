import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Phone, MapPin, MessageCircle, ArrowLeft } from 'lucide-react-native';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  address: string;
  phone: string;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Детский велосипед',
    description: 'Велосипед в хорошем состоянии, подходит для детей 5-8 лет. Полностью рабочий, только немного потерт. В комплекте есть звонок и корзинка. Отдаю бесплатно, так как дети выросли.',
    price: 'Бесплатно',
    address: 'ул. Ленина, 15',
    phone: '+7 (999) 123-45-67',
    image: 'https://images.unsplash.com/photo-1571333250630-f0230b59f5f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    title: 'Книжная полка',
    description: 'Деревянная книжная полка, хорошее состояние. Размеры: 120x30x180 см. Вмещает много книг, прочная конструкция. Нужно забрать самостоятельно.',
    price: 'Бесплатно',
    address: 'пр. Мира, 45',
    phone: '+7 (999) 765-43-21',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    title: 'Настольная лампа',
    description: 'Современная LED лампа с регулировкой яркости. Работает от USB или розетки. Имеет несколько режимов освещения. Отдаю бесплатно, так как купил новую.',
    price: 'Бесплатно',
    address: 'ул. Пушкина, 10',
    phone: '+7 (999) 555-33-22',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    title: 'Комнатные растения',
    description: 'Несколько горшков с неприхотливыми растениями. Включает кактусы, суккуленты и фикус. Все растения здоровы, просто уезжаю и не могу взять с собой.',
    price: 'Бесплатно',
    address: 'пр. Победы, 78',
    phone: '+7 (999) 111-22-33',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Товар не найден</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Информация о товаре</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Описание</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Адрес</Text>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.detailText}>{product.address}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Контакты</Text>
            <View style={styles.contactButtons}>
              <Pressable 
                style={styles.contactButton}
                onPress={() => {
                  // Здесь будет логика звонка
                }}
              >
                <Phone size={16} color="#0891b2" />
                <Text style={styles.contactButtonText}>Позвонить</Text>
              </Pressable>
              
              <Pressable 
                style={styles.contactButton}
                onPress={() => {
                  // Здесь будет логика сообщения
                }}
              >
                <MessageCircle size={16} color="#0891b2" />
                <Text style={styles.contactButtonText}>Написать</Text>
              </Pressable>
            </View>
          </View>
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
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  content: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0891b2',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#64748b',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
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
}); 