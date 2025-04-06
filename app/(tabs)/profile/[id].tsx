import { View, Text, StyleSheet, Pressable, Image, ScrollView, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Link, Mail, Phone, Building2, User as UserIcon } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import Post from '../../components/Post';
import { Post as PostType } from '../../data/posts';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  type: 'organization' | 'person';
  bio?: string;
  location?: string;
  joinDate: string;
  website?: string;
  email?: string;
  phone?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export default function ProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    // Сейчас используем моковые данные
    const mockProfile: UserProfile = {
      id: id as string,
      name: id === 'admin1' ? 'Администратор' : 'Иван Петров',
      avatar: id === 'admin1' 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      type: id === 'admin1' ? 'organization' : 'person',
      bio: id === 'admin1' 
        ? 'Официальный аккаунт администрации района'
        : 'Активный житель района, люблю наш город и стремлюсь сделать его лучше',
      location: 'Москва, Россия',
      joinDate: '2024-01-01',
      website: id === 'admin1' ? 'www.admin.ru' : undefined,
      email: id === 'admin1' ? 'admin@admin.ru' : 'user@example.com',
      phone: id === 'admin1' ? '+7 (999) 123-45-67' : undefined,
      stats: {
        posts: 45,
        followers: 1250,
        following: 84
      }
    };

    const mockPosts: PostType[] = [
      {
        id: '1',
        author: {
          id: id as string,
          name: mockProfile.name,
          avatar: mockProfile.avatar,
          type: mockProfile.type
        },
        content: 'Сегодня прошло очередное собрание жителей района. Обсудили важные вопросы благоустройства.',
        image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400',
        createdAt: new Date().toISOString(),
        likes: 15,
        isLiked: false,
        comments: []
      },
      {
        id: '2',
        author: {
          id: id as string,
          name: mockProfile.name,
          avatar: mockProfile.avatar,
          type: mockProfile.type
        },
        content: 'Начинаем подготовку к весеннему субботнику! Приглашаем всех желающих принять участие.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likes: 24,
        isLiked: true,
        comments: []
      }
    ];

    setProfile(mockProfile);
    setPosts(mockPosts);
  }, [id]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  const renderPost = ({ item }: { item: PostType }) => (
    <Post post={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>{profile.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{profile.name}</Text>
              {profile.type === 'organization' ? (
                <Building2 size={16} color="#0891b2" />
              ) : (
                <UserIcon size={16} color="#64748b" />
              )}
            </View>
            {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.posts}</Text>
            <Text style={styles.statLabel}>Постов</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.followers}</Text>
            <Text style={styles.statLabel}>Подписчиков</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.following}</Text>
            <Text style={styles.statLabel}>Подписок</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          <Pressable 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
              Посты
            </Text>
          </Pressable>
          <Pressable 
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
              О пользователе
            </Text>
          </Pressable>
        </View>

        {activeTab === 'posts' ? (
          <View style={styles.posts}>
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </View>
        ) : (
          <View style={styles.aboutSection}>
            {profile.location && (
              <View style={styles.infoRow}>
                <MapPin size={20} color="#64748b" />
                <Text style={styles.infoText}>{profile.location}</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Calendar size={20} color="#64748b" />
              <Text style={styles.infoText}>
                На платформе с {new Date(profile.joinDate).toLocaleDateString('ru-RU')}
              </Text>
            </View>
            {profile.website && (
              <View style={styles.infoRow}>
                <Link size={20} color="#64748b" />
                <Text style={styles.infoText}>{profile.website}</Text>
              </View>
            )}
            {profile.email && (
              <View style={styles.infoRow}>
                <Mail size={20} color="#64748b" />
                <Text style={styles.infoText}>{profile.email}</Text>
              </View>
            )}
            {profile.phone && (
              <View style={styles.infoRow}>
                <Phone size={20} color="#64748b" />
                <Text style={styles.infoText}>{profile.phone}</Text>
              </View>
            )}
          </View>
        )}
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
  profileHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
  },
  bio: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0891b2',
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
  },
  activeTabText: {
    color: '#0891b2',
    fontWeight: '600',
  },
  posts: {
    padding: 16,
  },
  aboutSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#0f172a',
  },
}); 