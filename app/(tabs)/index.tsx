import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Bell, MessageCircle, User } from 'lucide-react-native';

export default function HomeScreen() {
  
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
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>Новости района</Text>
          {news.map((item) => (
            <View key={item.id} style={styles.newsCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.newsImage}
              />
              <View style={styles.newsContent}>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
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