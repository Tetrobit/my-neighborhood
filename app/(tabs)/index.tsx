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
                marginBottom: 24,          
                paddingHorizontal: 8,      
              }}
            >
              {/* Контейнер с иконкой */}
              <View
                style={{
                  width: 72,               
                  height: 72,              
                  backgroundColor: '#F7E4E4',
                  borderRadius: 20,        
                  justifyContent: 'center',
                  alignItems: 'center',    
                  marginBottom: 10,         
                }}
              >
                <Ionicons name={service.icon} size={36} color="#A67F8E" />
              </View>
              
              {/* Контейнер с текстом */}
              <View
                style={{
                  width: '100%',              
                  paddingHorizontal: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 32,        
                }}
              >
                <Text 
                  style={{ 
                    fontSize: 12,              
                    textAlign: 'center',
                    color: '#6D4C4C',
                    lineHeight: 12,             
                  }}
                  numberOfLines={2}
                  adjustsFontSizeToFit         
                >
                  {service.name}
                </Text>
              </View>
            </Link>
          ))}
        </View>

        {/* Блок сообщества */}
        <View style={{ padding: 15, backgroundColor: 'white', marginTop: 10 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 15,
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6D4C4C' }}>
              Сообщество
            </Text>
            <Link href="/community" asChild>
              <TouchableOpacity>
                <Text style={{ color: '#A67F8E', fontSize: 14 }}>
                  Все записи
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {}}
                style={{
                  width: 280,
                  height: 180,
                  backgroundColor: '#F7E4E4',
                  borderRadius: 20,
                  marginRight: 15,
                  padding: 15,
                  overflow: 'hidden',
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: 20, 
                      backgroundColor: '#F5C0C0',
                      marginRight: 10,
                    }} />
                    <View>
                      <Text style={{ color: '#6D4C4C', fontWeight: '600', fontSize: 14 }}>
                        Анна Петрова
                      </Text>
                      <Text style={{ color: '#A67F8E', fontSize: 12 }}>
                        2 часа назад
                      </Text>
                    </View>
                  </View>
                  <Text 
                    style={{ 
                      color: '#6D4C4C', 
                      fontSize: 14, 
                      lineHeight: 20,
                    }}
                    numberOfLines={4}
                  >
                    Друзья! В эту субботу в нашем районе проводится субботник. Приглашаем всех желающих присоединиться к уборке парка. Вместе мы сделаем наш район чище и уютнее! 🌿
                  </Text>
                  <View style={{ 
                    flexDirection: 'row', 
                    marginTop: 10,
                    alignItems: 'center'
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                      <Ionicons name="heart-outline" size={16} color="#A67F8E" />
                      <Text style={{ color: '#A67F8E', marginLeft: 4, fontSize: 12 }}>12</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="chatbubble-outline" size={16} color="#A67F8E" />
                      <Text style={{ color: '#A67F8E', marginLeft: 4, fontSize: 12 }}>8</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Блок малого бизнеса */}
        <View style={{ padding: 15, backgroundColor: 'white', marginTop: 10, marginBottom: 20 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 15,
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6D4C4C' }}>
              Топ-предложения
            </Text>
            <Link href="/business" asChild>
              <TouchableOpacity>
                <Text style={{ color: '#A67F8E', fontSize: 14 }}>
                  Все предложения
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={{
                width: 200,
                height: 250,
                backgroundColor: '#F7E4E4',
                borderRadius: 20,
                marginRight: 15,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800' }}
                style={{
                  width: '100%',
                  height: 160,
                }}
                resizeMode="cover"
              />
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#6D4C4C', marginBottom: 4 }}>
                  Кафе "У Реки"
                </Text>
                <Text style={{ fontSize: 14, color: '#A67F8E', marginBottom: 8 }}>
                  от 1 200 ₽ за обед
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="location-outline" size={14} color="#A67F8E" />
                  <Text style={{ fontSize: 12, color: '#A67F8E', marginLeft: 4 }}>
                    1.5 км от вас
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 200,
                height: 250,
                backgroundColor: '#F7E4E4',
                borderRadius: 20,
                marginRight: 15,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800' }}
                style={{
                  width: '100%',
                  height: 160,
                }}
                resizeMode="cover"
              />
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#6D4C4C', marginBottom: 4 }}>
                  Фитнес "Энергия"
                </Text>
                <Text style={{ fontSize: 14, color: '#A67F8E', marginBottom: 8 }}>
                  Скидка 20% на абонемент
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="location-outline" size={14} color="#A67F8E" />
                  <Text style={{ fontSize: 12, color: '#A67F8E', marginLeft: 4 }}>
                    2.3 км от вас
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 200,
                height: 250,
                backgroundColor: '#F7E4E4',
                borderRadius: 20,
                marginRight: 15,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800' }}
                style={{
                  width: '100%',
                  height: 160,
                }}
                resizeMode="cover"
              />
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#6D4C4C', marginBottom: 4 }}>
                  Салон "Красота"
                </Text>
                <Text style={{ fontSize: 14, color: '#A67F8E', marginBottom: 8 }}>
                  Маникюр + педикюр 250₽
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="location-outline" size={14} color="#A67F8E" />
                  <Text style={{ fontSize: 12, color: '#A67F8E', marginLeft: 4 }}>
                    800 м от вас
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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