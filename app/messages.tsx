import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
}

export default function MessagesScreen() {
  const router = useRouter();

  const conversations: Conversation[] = [
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
    {
      id: 3,
      name: 'Новости района',
      lastMessage: 'Напоминаем о предстоящем субботнике',
      time: 'Пн',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const renderItem = ({ item }: { item: Conversation }) => (
    <Pressable 
      style={styles.conversationItem}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unread && <View style={styles.unreadBadge} />}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>Сообщения</Text>
      </View>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
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
  listContent: {
    padding: 16,
  },
  conversationItem: {
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  time: {
    fontSize: 14,
    color: '#64748b',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
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
}); 