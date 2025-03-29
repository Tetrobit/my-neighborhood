import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Сообщество</Text>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconButton}>
            <Search size={24} color="#0f172a" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Filter size={24} color="#0f172a" />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categories}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            <Pressable style={styles.categoryButton}>
              <Text style={styles.categoryText}>Все</Text>
            </Pressable>
            <Pressable style={[styles.categoryButton, styles.categoryActive]}>
              <Text style={[styles.categoryText, styles.categoryTextActive]}>Кулинария</Text>
            </Pressable>
            <Pressable style={styles.categoryButton}>
              <Text style={styles.categoryText}>Спорт</Text>
            </Pressable>
            <Pressable style={styles.categoryButton}>
              <Text style={styles.categoryText}>Искусство</Text>
            </Pressable>
            <Pressable style={styles.categoryButton}>
              <Text style={styles.categoryText}>Садоводство</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View style={styles.posts}>
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.userName}>Анна Петрова</Text>
                <Text style={styles.postTime}>2 часа назад</Text>
              </View>
            </View>
            <Text style={styles.postText}>Делюсь рецептом домашнего хлеба! Получился очень вкусный и ароматный...</Text>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800' }}
              style={styles.postImage}
            />
            <View style={styles.postActions}>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionText}>Нравится • 24</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionText}>Комментарии • 8</Text>
              </Pressable>
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
  },
  iconButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  categories: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f1f5f9',
  },
  categoryActive: {
    backgroundColor: '#0891b2',
  },
  categoryText: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  posts: {
    padding: 16,
  },
  post: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  postTime: {
    fontSize: 12,
    color: '#64748b',
  },
  postText: {
    fontSize: 14,
    color: '#0f172a',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
  },
});