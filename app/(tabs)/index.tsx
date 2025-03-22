import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Bell, MessageCircle, User } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();
  
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

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Быстрые действия</Text>
          <View style={styles.actionGrid}>
            <Link href="../events" asChild>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionText}>События</Text>
              </Pressable>
            </Link>
            <Link href="../map" asChild>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionText}>Карта</Text>
              </Pressable>
            </Link>
            <Link href="../services" asChild>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionText}>Услуги</Text>
              </Pressable>
            </Link>
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
  newsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
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
  quickActions: {
    padding: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#0891b2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: '30%',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});