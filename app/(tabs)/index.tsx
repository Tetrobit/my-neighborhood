import { View, Text, ScrollView, StyleSheet, Image, Pressable, Animated } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Bell, MessageCircle, User, ChevronRight } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { POSTS, Post as PostType } from '../data/posts';
import Post from '../components/Post';
import { Share } from 'react-native';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>(POSTS);
  const [filter, setFilter] = useState<'nearby' | 'district'>('nearby');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  useEffect(() => {
    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId
          ? { 
              ...post, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked 
            }
          : post
      )
    );
  };

  const handleComment = (postId: string, text: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now().toString(),
                  user: {
                    id: 'current-user',
                    name: 'Вы',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
                    type: 'person'
                  },
                  text,
                  createdAt: new Date().toISOString()
                }
              ]
            }
          : post
      )
    );
  };

  const handleShare = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      try {
        await Share.share({
          message: `${post.content}\n\nОпубликовано пользователем ${post.author.name} в приложении WeLocal`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

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

  // Фильтрация постов для Вахитовского района (пример: только организации, сортировка по лайкам)
  const districtPosts = posts
    .filter(post => post.author.type === 'organization')
    .sort((a, b) => b.likes - a.likes);

  // Текст для выбранного фильтра
  const filterLabel = filter === 'nearby' ? 'Ближайшие 3 км' : 'Вахитовский район';

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Мой район</Text>
          <Text style={styles.headerSubtitle}>Будьте в курсе событий</Text>
          {/* Dropdown под подзаголовком */}
          <View style={{marginTop: 4, minHeight: 24}}>
            <Pressable onPress={() => setDropdownOpen(open => !open)} style={styles.dropdownLabelRow}>
              <Text style={styles.dropdownLabel}>{filterLabel}</Text>
              <ChevronRight size={16} color="#94a3b8" style={{transform: [{rotate: dropdownOpen ? '90deg' : '0deg'}]}} />
            </Pressable>
            {dropdownOpen && (
              <View style={styles.dropdownMenu}>
                <Pressable
                  style={[styles.dropdownItem, filter === 'nearby' && styles.dropdownItemActive]}
                  onPress={() => { setFilter('nearby'); setDropdownOpen(false); }}
                >
                  <Text style={[styles.dropdownItemText, filter === 'nearby' && styles.dropdownItemTextActive]}>Ближайшие 3 км</Text>
                </Pressable>
                <Pressable
                  style={[styles.dropdownItem, filter === 'district' && styles.dropdownItemActive]}
                  onPress={() => { setFilter('district'); setDropdownOpen(false); }}
                >
                  <Text style={[styles.dropdownItemText, filter === 'district' && styles.dropdownItemTextActive]}>Вахитовский район</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Link href="/notifications" asChild>
            <Pressable style={styles.iconButton}>
              <Bell size={24} color="#0f172a" />
            </Pressable>
          </Link>
          <Link href="/messages" asChild>
            <Pressable style={styles.iconButton}>
              <MessageCircle size={24} color="#0f172a" />
            </Pressable>
          </Link>
          <Link href="/profile" asChild>
            <Pressable style={styles.iconButton}>
              <User size={24} color="#0f172a" />
            </Pressable>
          </Link>
        </View>
      </View>

      <ScrollView style={styles.content}>
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
              onPress={() => router.push(`/chat/${message.id}`)}
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

        <View style={styles.postsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Новости района</Text>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Все новости</Text>
              <ChevronRight size={16} color="#0891b2" />
            </Pressable>
          </View>
          {(filter === 'nearby' ? posts : districtPosts).map(post => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))}
          {filter === 'district' && districtPosts.length === 0 && (
            <Text style={{textAlign: 'center', color: '#64748b', marginTop: 16}}>Постов от организаций пока нет</Text>
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
  postsSection: {
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
  dropdownLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    marginTop: 0,
    gap: 4,
    minHeight: 24,
  },
  dropdownLabel: {
    color: '#94a3b8',
    fontWeight: '400',
    fontSize: 15,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 24,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: 'flex-start',
    minWidth: 160,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownItemActive: {
    backgroundColor: '#e0f2fe',
  },
  dropdownItemText: {
    color: '#0f172a',
    fontSize: 15,
  },
  dropdownItemTextActive: {
    color: '#0891b2',
    fontWeight: '600',
  },
});