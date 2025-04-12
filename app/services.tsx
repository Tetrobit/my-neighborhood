import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const allServices = [
  { id: 1, name: 'Фермерский рынок', icon: 'leaf-outline', route: '/farmer-market', description: 'Свежие продукты от местных фермеров' },
  { id: 2, name: 'События', icon: 'calendar-outline', route: '/events', description: 'Мероприятия и события в вашем районе' },
  { id: 3, name: 'Местные услуги', icon: 'construct-outline', route: '/localservices', description: 'Услуги от местных специалистов' },
  { id: 4, name: 'Сообщество', icon: 'people-outline', route: '/community', description: 'Общение с соседями' },
  { id: 5, name: 'Переработка', icon: 'refresh-outline', route: '/recycling', description: 'Пункты приема вторсырья' },
  { id: 6, name: 'Бизнес', icon: 'business-outline', route: '/business', description: 'Локальный бизнес' },
  { id: 7, name: 'Чат', icon: 'chatbubbles-outline', route: '/chat', description: 'Общение с сообществом' },
  { id: 9, name: 'Карта', icon: 'map-outline', route: '/map', description: 'Карта локальных мест' },
  { id: 10, name: 'Опросы', icon: 'list-outline', route: '/surveys', description: 'Опросы местного сообщества' },
  { id: 11, name: 'Продукты', icon: 'cart-outline', route: '/products', description: 'Товары местных производителей' },
  { id: 12, name: 'Профиль', icon: 'person-outline', route: '/profile', description: 'Ваш профиль' },
];

export default function ServicesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Все сервисы</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {allServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceItem}
            onPress={() => router.push(service.route)}
          >
            <View style={styles.serviceIcon}>
              <Ionicons name={service.icon as any} size={24} color="#2A9D8F" />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#6D4C4C',
    borderBottomWidth: 1,
    borderBottomColor: '#A67F8E',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 1,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7E4E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#6D4C4C',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#A67F8E',
  },
}); 