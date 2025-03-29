import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Bell, MessageCircle, User, Store, Users, Calendar, Menu, Recycle, MapPin, Phone, Info } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();
  
  const miniApps = [
    { icon: Store, title: 'Каталог', href: '/(tabs)/catalog' },
    { icon: Users, title: 'Сообщество', href: '/(tabs)/community' },
    { icon: Calendar, title: 'События', href: '/(tabs)/events' },
    { icon: Menu, title: 'Сервисы', href: '/(tabs)/services' },
    { icon: Recycle, title: 'Переработка', href: '/recycling' },
    { icon: MapPin, title: 'Карта', href: '/map' },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мой район</Text>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconButton}>
            <Bell size={24} color="#0f172a" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <MessageCircle size={24} color="#0f172a" />
          </Pressable>
          <Link href="../../account" asChild>
            <Pressable style={styles.avatarButton}>
              {user?.avatar_url ? (
                <Image
                  source={{ uri: user.avatar_url }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <User size={18} color="#64748b" />
                </View>
              )}
            </Pressable>
          </Link>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.miniAppsSection}>
          <Text style={styles.sectionTitle}>Мини-приложения</Text>
          <View style={styles.miniAppsGrid}>
            {miniApps.map((app, index) => (
              <Link key={index} href={app.href} asChild>
                <Pressable style={styles.miniAppButton}>
                  <View style={styles.miniAppIcon}>
                    <app.icon size={24} color="#0891b2" />
                  </View>
                  <Text style={styles.miniAppText}>{app.title}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>

        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>Новости района</Text>
          <View style={styles.newsCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800' }}
              style={styles.newsImage}
            />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>Открытие нового парка</Text>
              <Text style={styles.newsDescription}>В эту субботу состоится торжественное открытие обновленного городского парка...</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  miniAppsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  miniAppsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  miniAppButton: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  miniAppIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  miniAppText: {
    fontSize: 14,
    color: '#0f172a',
    textAlign: 'center',
  },
  newsSection: {
    padding: 16,
  },
  newsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
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