import { View, Text, StyleSheet, Pressable, Image, ScrollView, Linking } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Phone, MapPin, MessageCircle, ArrowLeft } from 'lucide-react-native';

const rentals = [
  {
    id: '1',
    title: '1-комнатная квартира на Ленина',
    description: 'Светлая квартира с ремонтом, вся мебель и техника. Рядом метро и магазины.',
    price: '22 000 ₽/мес',
    address: 'ул. Ленина, 15',
    phone: '+7 (999) 123-45-67',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: '2-комнатная у парка',
    description: 'Уютная квартира для семьи. Большая кухня, балкон, тихий двор.',
    price: '30 000 ₽/мес',
    address: 'пр. Мира, 45',
    phone: '+7 (999) 765-43-21',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Студия в центре',
    description: 'Современная студия с новым ремонтом. Всё необходимое для жизни.',
    price: '18 000 ₽/мес',
    address: 'ул. Пушкина, 10',
    phone: '+7 (999) 555-33-22',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  },
];

export default function RentalDetailsScreen() {
  const { id } = useLocalSearchParams();
  const rental = rentals.find(r => r.id === id);

  if (!rental) {
    return (
      <View style={styles.container}>
        <Text>Квартира не найдена</Text>
      </View>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${rental.phone.replace(/\s/g, '')}`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:${rental.phone.replace(/\s/g, '')}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Информация о квартире</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: rental.image }} style={styles.rentalImage} />
        <View style={styles.info}>
          <Text style={styles.title}>{rental.title}</Text>
          <Text style={styles.price}>{rental.price}</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Описание</Text>
            <Text style={styles.description}>{rental.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Адрес</Text>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.detailText}>{rental.address}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Контакты</Text>
            <View style={styles.contactButtons}>
              <Pressable style={styles.contactButton} onPress={handleCall}>
                <Phone size={16} color="#0891b2" />
                <Text style={styles.contactButtonText}>Позвонить</Text>
              </Pressable>
              <Pressable style={styles.contactButton} onPress={handleMessage}>
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
    paddingTop: 16,
    paddingHorizontal: 16,
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
    flex: 1,
  },
  content: {
    flex: 1,
  },
  rentalImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },
  info: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0891b2',
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0891b2',
    marginLeft: 6,
  },
}); 