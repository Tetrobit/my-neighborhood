import { View, Text, StyleSheet, Pressable, Image, ScrollView, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Link, Mail, Phone, Building2, User as UserIcon, Clock, Award, Briefcase, Heart, AlertCircle } from 'lucide-react-native';
import { useState, useCallback, useMemo } from 'react';
import Post from '../components/Post';
import { Post as PostType } from '../data/posts';
import { USERS_BY_ID } from '../data/users';
import { PersonProfile, OrganizationProfile } from '../types/profile';

type UserProfile = PersonProfile | OrganizationProfile;

const EmptyProfile = () => {
  return (
    <View style={styles.emptyContainer}>
      <AlertCircle size={64} color="#94a3b8" style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>Профиль не найден</Text>
      <Text style={styles.emptyDescription}>
        Пользователь с указанным идентификатором не существует или был удален
      </Text>
    </View>
  );
};

const RenderAboutContent = ({ profile }: { profile: UserProfile }) => {
  if (profile.type === 'organization') {
    return (
      <View style={styles.aboutSection}>
        <View style={styles.infoRow}>
          <MapPin size={20} color="#64748b" />
          <Text style={styles.infoText}>{profile.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Calendar size={20} color="#64748b" />
          <Text style={styles.infoText}>
            На платформе с {new Date(profile.joinDate).toLocaleDateString('ru-RU')}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={20} color="#64748b" />
          <Text style={styles.infoText}>{profile.workingHours}</Text>
        </View>
        <View style={styles.infoRow}>
          <Link size={20} color="#64748b" />
          <Text style={styles.infoText}>{profile.website}</Text>
        </View>
        <View style={styles.infoRow}>
          <Mail size={20} color="#64748b" />
          <Text style={styles.infoText}>{profile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Phone size={20} color="#64748b" />
          <Text style={styles.infoText}>{profile.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Услуги</Text>
          {profile.services?.map((service, index) => (
            <Text key={index} style={styles.listItem}>• {service}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Текущие проекты</Text>
          {profile.projects?.map((project, index) => (
            <Text key={index} style={styles.listItem}>• {project}</Text>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.aboutSection}>
      <View style={styles.infoRow}>
        <MapPin size={20} color="#64748b" />
        <Text style={styles.infoText}>{profile.location}</Text>
      </View>
      <View style={styles.infoRow}>
        <Calendar size={20} color="#64748b" />
        <Text style={styles.infoText}>
          На платформе с {new Date(profile.joinDate).toLocaleDateString('ru-RU')}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Mail size={20} color="#64748b" />
        <Text style={styles.infoText}>{profile.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Briefcase size={20} color="#64748b" />
        <Text style={styles.infoText}>{profile.profession}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Интересы</Text>
        <View style={styles.interestsList}>
          {profile.interests?.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Достижения</Text>
        {profile.achievements?.map((achievement, index) => (
          <View key={index} style={styles.infoRow}>
            <Award size={16} color="#0891b2" />
            <Text style={styles.listItem}>{achievement}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Волонтерство</Text>
        {profile.volunteering?.map((activity, index) => (
          <View key={index} style={styles.infoRow}>
            <Heart size={16} color="#0891b2" />
            <Text style={styles.listItem}>{activity}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [isLoading, setIsLoading] = useState(true);
  const [isScreenMounted, setIsScreenMounted] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      setIsNotFound(false);
      const userProfile = USERS_BY_ID[id as string];
      
      if (!userProfile) {
        setIsNotFound(true);
        setIsLoading(false);
        return;
      }

      const mockPosts: PostType[] = [
        {
          id: '1',
          author: {
            id: userProfile.id,
            name: userProfile.name,
            avatar: userProfile.avatar,
            type: userProfile.type
          },
          content: userProfile.type === 'organization' 
            ? 'Сегодня прошло очередное собрание жителей района. Обсудили важные вопросы благоустройства и приняли решение о начале реконструкции парка.'
            : userProfile.name === 'Анна Михайлова'
              ? 'Провела сегодня увлекательный мастер-класс для детей. Рисовали, играли и учились новому. Спасибо всем участникам!'
              : 'Принял участие в субботнике! Вместе мы сделали наш двор чище и уютнее. Спасибо всем, кто присоединился!',
          image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400',
          createdAt: new Date().toISOString(),
          likes: 15,
          isLiked: false,
          comments: []
        },
        {
          id: '2',
          author: {
            id: userProfile.id,
            name: userProfile.name,
            avatar: userProfile.avatar,
            type: userProfile.type
          },
          content: userProfile.type === 'organization'
            ? 'Начинаем подготовку к весеннему субботнику! Приглашаем всех желающих принять участие. Сбор в 10:00 у здания администрации.'
            : userProfile.name === 'Анна Михайлова'
              ? 'Готовимся к школьному фестивалю талантов! Наши ученики покажут свои творческие способности. Приглашаем всех поддержать юные таланты!'
              : 'Отличная новость! Наш проект по благоустройству двора получил поддержку администрации. Скоро начнем реализацию!',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          likes: 24,
          isLiked: true,
          comments: []
        }
      ];

      setTimeout(() => {
        if (isScreenMounted) {
          setProfile(userProfile);
          setPosts(mockPosts);
          setIsLoading(false);
        }
      }, 100);

    } catch (error) {
      console.error('Error loading profile:', error);
      setIsNotFound(true);
      setIsLoading(false);
    }
  }, [id, isScreenMounted]);

  useFocusEffect(
    useCallback(() => {
      setIsScreenMounted(true);
      loadProfile();

      return () => {
        setIsScreenMounted(false);
        setProfile(null);
        setPosts([]);
        setIsLoading(true);
        setIsNotFound(false);
      };
    }, [loadProfile])
  );

  const handleTabChange = useCallback((tab: 'posts' | 'about') => {
    requestAnimationFrame(() => {
      setActiveTab(tab);
    });
  }, []);

  const renderAboutContent = useMemo(() => {
    if (!profile) return null;

    return (
      <RenderAboutContent profile={profile} />
    );
  }, [profile]);

  if (!isScreenMounted || isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (isNotFound || !profile) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#0f172a" />
          </Pressable>
          <Text style={styles.headerTitle}>Профиль</Text>
        </View>
        <EmptyProfile />
      </View>
    );
  }

  const currentProfile = profile;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.headerTitle}>{currentProfile.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: currentProfile.avatar }} 
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{currentProfile.name}</Text>
              {currentProfile.type === 'organization' ? (
                <Building2 size={16} color="#0891b2" />
              ) : (
                <UserIcon size={16} color="#64748b" />
              )}
            </View>
            {currentProfile.bio && <Text style={styles.bio}>{currentProfile.bio}</Text>}
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentProfile.stats.posts}</Text>
            <Text style={styles.statLabel}>Постов</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentProfile.stats.followers}</Text>
            <Text style={styles.statLabel}>Подписчиков</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentProfile.stats.following}</Text>
            <Text style={styles.statLabel}>Подписок</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          <Pressable 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => handleTabChange('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
              Посты
            </Text>
          </Pressable>
          <Pressable 
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => handleTabChange('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
              О {currentProfile.type === 'organization' ? 'компании' : 'пользователе'}
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
          <RenderAboutContent profile={currentProfile} />
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  listItem: {
    fontSize: 14,
    color: '#0f172a',
    marginLeft: 8,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 12,
    color: '#0f172a',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 