import { View, Text, ScrollView, StyleSheet, Image, Pressable, Animated, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Bell, MessageCircle, User, ChevronRight } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { POSTS, Post as PostType } from '../data/posts';
import Post from '../components/Post';
import { Share } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

const services: Array<{
  id: number;
  name: string;
  icon: IconName;
  route: string;
}> = [
  { id: 1, name: 'Фермерский рынок', icon: 'leaf-outline', route: '/farmer-market' },
  { id: 2, name: 'События', icon: 'calendar-outline', route: '/events' },
  { id: 3, name: 'Местные услуги', icon: 'construct-outline', route: '/localservices' },
  { id: 4, name: 'Сообщество', icon: 'people-outline', route: '/community' },
  { id: 5, name: 'Переработка', icon: 'refresh-outline', route: '/recycling' },
  { id: 6, name: 'Бизнес', icon: 'business-outline', route: '/business' },
  { id: 7, name: 'Чат', icon: 'chatbubbles-outline', route: '/chat' },
  { id: 8, name: 'Ещё', icon: 'ellipsis-horizontal-outline', route: '/services' },
];

const MainScreen = () => {
  const tabs = ['Все', 'Услуги', 'События', 'Магазины'];

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar style="light" />
      
      <ScrollView>
        {/* Верхний баннер */}
        <LinearGradient
          colors={['#6D4C4C', '#A67F8E']}
          style={{ padding: 20, height: 180 }}
        >
          <Text style={{ color: 'white', fontSize: 24, marginTop: 40 }}>
            Местные продукты
          </Text>
          <Text style={{ color: 'white', fontSize: 18, marginTop: 5 }}>
            Поддержите локальных производителей
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#F5C0C0',
              padding: 10,
              borderRadius: 20,
              marginTop: 15,
              width: 120,
            }}
          >
            <Text style={{ color: '#6D4C4C', fontWeight: 'bold' }}>Подробнее</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Навигационные вкладки */}
        <View style={{ flexDirection: 'row', padding: 15, backgroundColor: 'white' }}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginRight: 20,
                paddingBottom: 5,
                borderBottomWidth: index === 0 ? 2 : 0,
                borderBottomColor: '#A67F8E',
              }}
            >
              <Text
                style={{
                  color: index === 0 ? '#A67F8E' : '#999',
                  fontWeight: index === 0 ? 'bold' : 'normal',
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Сетка сервисов */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 15,
            backgroundColor: 'white',
            marginTop: 10,
          }}
        >
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.route}
              style={{
                width: '25%',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#F7E4E4',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name={service.icon} size={30} color="#A67F8E" />
              </View>
              <Text style={{ marginTop: 5, fontSize: 12, textAlign: 'center', color: '#6D4C4C' }}>
                {service.name}
              </Text>
            </Link>
          ))}
        </View>

        {/* Промо-баннер */}
        <View style={{ padding: 15, backgroundColor: 'white', marginTop: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#6D4C4C' }}>
            Новости сообщества
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                style={{
                  width: 200,
                  height: 250,
                  backgroundColor: '#F5C0C0',
                  borderRadius: 20,
                  marginRight: 15,
                }}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

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
});