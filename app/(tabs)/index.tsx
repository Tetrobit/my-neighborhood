import { View, Text, ScrollView, StyleSheet, Image, Pressable, Animated } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Bell, MessageCircle, User, ChevronRight } from 'lucide-react-native';
import { useEffect, useRef } from 'react';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const news = [
    {
      id: 1,
      title: 'Открытие нового парка',
      description: 'В эту субботу состоится торжественное открытие обновленного городского парка. Приглашаем всех жителей района на праздничное мероприятие!',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
      date: '25 марта 2024',
    },
    {
      id: 2,
      title: 'Новый пункт переработки',
      description: 'В нашем районе открылся новый пункт приема вторсырья. Теперь жители могут сдавать пластик, бумагу и стекло в удобном месте.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
      date: '23 марта 2024',
    },
    {
      id: 3,
      title: 'Фестиваль местных предпринимателей',
      description: 'В следующем месяце пройдет фестиваль местных предпринимателей. Узнайте о новых бизнесах в вашем районе и получите специальные предложения.',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800',
      date: '20 марта 2024',
    },
  ];

  const recentMessages = [
    {
      id: 1,
      name: 'Администрация района',
      lastMessage: 'Спасибо за ваше обращение! Мы рассмотрим его в ближайшее время.',
      time: '10:30',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      name: 'Служба поддержки',
      lastMessage: 'Ваше обращение №12345 принято в работу',
      time: 'Вчера',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
    },
  ];
  
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Мой район</Text>
          <Text style={styles.headerSubtitle}>Добро пожаловать!</Text>
        </View>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconButton} onPress={() => router.push('/notifications')}>
            <Bell size={24} color="#0f172a" />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => router.push('/messages')}>
            <MessageCircle size={24} color="#0f172a" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.messagesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Сообщения</Text>
            <Pressable style={styles.seeAllButton} onPress={() => router.push('/messages')}>
              <Text style={styles.seeAllText}>Все сообщения</Text>
              <ChevronRight size={16} color="#0891b2" />
            </Pressable>
          </View>
          {recentMessages.map((message) => (
            <Pressable 
              key={message.id} 
              style={styles.messageCard}
              onPress={() => router.push('/messages')}
            >
              <Image source={{ uri: message.avatar }} style={styles.messageAvatar} />
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.messageName}>{message.name}</Text>
                  <Text style={styles.messageTime}>{message.time}</Text>
                </View>
                <View style={styles.messageFooter}>
                  <Text style={styles.messageText} numberOfLines={1}>{message.lastMessage}</Text>
                  {message.unread && <View style={styles.unreadBadge} />}
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.newsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Новости района</Text>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Все новости</Text>
              <ChevronRight size={16} color="#0891b2" />
            </Pressable>
          </View>
          {news.map((item) => (
            <Pressable key={item.id} style={styles.newsCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.newsImage}
              />
              <View style={styles.newsContent}>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDescription} numberOfLines={2}>{item.description}</Text>
              </View>
            </Pressable>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  messagesSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '500',
  },
  messageCard: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  messageTime: {
    fontSize: 14,
    color: '#64748b',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0891b2',
  },
  newsSection: {
    padding: 16,
  },
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsContent: {
    padding: 16,
  },
  newsDate: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});