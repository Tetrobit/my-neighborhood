import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      title: 'Новое сообщение',
      description: 'У вас есть новое сообщение от соседа',
      time: '5 минут назад',
      read: false,
    },
    {
      id: 2,
      title: 'Обновление статуса',
      description: 'Ваш запрос на участие в мероприятии одобрен',
      time: '1 час назад',
      read: true,
    },
    {
      id: 3,
      title: 'Напоминание',
      description: 'Не забудьте принять участие в собрании жителей',
      time: '2 часа назад',
      read: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Уведомления</Text>
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <Pressable
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.unreadNotification,
            ]}
          >
            <View style={styles.notificationIcon}>
              <Bell size={20} color={notification.read ? '#64748b' : '#0f172a'} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>
                {notification.description}
              </Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  content: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  unreadNotification: {
    backgroundColor: '#f8fafc',
  },
  notificationIcon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
}); 