import { View, Text, ScrollView, StyleSheet, Pressable, Image, Linking } from 'react-native';
import { Link, router } from 'expo-router';
import { Phone, MapPin, MessageCircle, ArrowLeft, Plus } from 'lucide-react-native';

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
    description: 'Велосипед в хорошем состоянии, подходит для детей 5-8 лет',
    price: 'Бесплатно',
    address: 'ул. Ленина, 15',
    phone: '+7 (999) 123-45-67',
    image: 'https://images.unsplash.com/photo-1571333250630-f0230b59f5f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    title: 'Книжная полка',
    description: 'Деревянная книжная полка, хорошее состояние',
    price: 'Бесплатно',
    address: 'пр. Мира, 45',
    phone: '+7 (999) 765-43-21',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    title: 'Настольная лампа',
    description: 'Современная LED лампа с регулировкой яркости',
    price: 'Бесплатно',
    address: 'ул. Пушкина, 10',
    phone: '+7 (999) 555-33-22',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    title: 'Комнатные растения',
    description: 'Несколько горшков с неприхотливыми растениями',
    price: 'Бесплатно',
    address: 'пр. Победы, 78',
    phone: '+7 (999) 111-22-33',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
];

export default function FreeMarketScreen() {
  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const handleMessage = (phone: string) => {
    Linking.openURL(`sms:${phone.replace(/\s/g, '')}`);
  };

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {products.map((product) => (
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
          ))}
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
}); 