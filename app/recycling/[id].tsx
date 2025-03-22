import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  MapPin,
  ChevronLeft,
  Clock,
  Phone,
  Navigation,
  Share2,
  Info,
} from 'lucide-react-native';

import { RECYCLING_POINTS, MATERIAL_COLORS } from '../data/recyclingPoints';

export default function RecyclingDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Найти пункт переработки по ID
  const point = RECYCLING_POINTS.find(p => p.id === id);
  
  // Если точка не найдена, показываем сообщение и кнопку назад
  if (!point) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Пункт не найден</Text>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Пункт переработки не найден</Text>
          <TouchableOpacity 
            style={styles.backToMapButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backToMapText}>Вернуться к карте</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  // Функция для открытия приложения карт с маршрутом
  const openMapsWithRoute = () => {
    const [lon, lat] = point.coordinates;
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = Platform.OS === 'ios'
      ? `${scheme}?q=${lat},${lon}&ll=${lat},${lon}&z=16`
      : `${scheme}${lat},${lon}?q=${lat},${lon}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // Запасной вариант - открыть Яндекс.Карты в браузере
        Linking.openURL(`https://yandex.ru/maps/?pt=${lon},${lat}&z=16`);
      }
    });
  };
  
  // Функция для звонка
  const callPhone = () => {
    if (point.phone) {
      Linking.openURL(`tel:${point.phone}`);
    }
  };
  
  // Функция для копирования информации о пункте
  const sharePoint = () => {
    const message = `${point.name}\nАдрес: ${point.address}\nПринимает: ${point.materials.join(', ')}\nРежим работы: ${point.workingHours}${point.phone ? `\nТелефон: ${point.phone}` : ''}`;
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Linking.openURL(`sms:&body=${message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{point.name}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800' }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.badgeContainer}>
              {point.materials.slice(0, 3).map((material) => (
                <View key={material} style={[
                  styles.materialBadge,
                  { backgroundColor: MATERIAL_COLORS[material] }
                ]}>
                  <Text style={styles.materialBadgeText}>{material}</Text>
                </View>
              ))}
              {point.materials.length > 3 && (
                <View style={styles.moreBadge}>
                  <Text style={styles.moreBadgeText}>+{point.materials.length - 3}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MapPin size={20} color="#64748b" />
            <Text style={styles.detailText}>{point.address}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Clock size={20} color="#64748b" />
            <Text style={styles.detailText}>{point.workingHours}</Text>
          </View>
          
          {point.phone && (
            <TouchableOpacity style={styles.detailRow} onPress={callPhone}>
              <Phone size={20} color="#0891b2" />
              <Text style={[styles.detailText, styles.linkText]}>{point.phone}</Text>
            </TouchableOpacity>
          )}
          
          {point.description && (
            <View style={styles.descriptionContainer}>
              <Info size={20} color="#64748b" style={styles.descriptionIcon} />
              <Text style={styles.descriptionText}>{point.description}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.materialsContainer}>
          <Text style={styles.sectionTitle}>Принимаемые материалы</Text>
          <View style={styles.materialsList}>
            {point.materials.map((material) => (
              <View key={material} style={[
                styles.materialItem,
                { backgroundColor: MATERIAL_COLORS[material] + '20' } // полупрозрачный цвет
              ]}>
                <View style={[
                  styles.materialDot,
                  { backgroundColor: MATERIAL_COLORS[material] }
                ]} />
                <Text style={styles.materialText}>{material}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Советы по сортировке</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Пластик</Text>
            <Text style={styles.tipText}>
              Перед сдачей пластиковых контейнеров их необходимо помыть и сжать для экономии места.
              Обратите внимание на маркировку: не все виды пластика принимаются на переработку.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Бумага</Text>
            <Text style={styles.tipText}>
              Бумагу следует складывать отдельно от картона. Глянцевые журналы, чеки и упаковки от еды
              обычно не подлежат переработке из-за специального покрытия.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Стекло</Text>
            <Text style={styles.tipText}>
              Стеклянную тару нужно вымыть от остатков содержимого. Стекло можно сдавать разбитым,
              но лампочки, зеркала и оконное стекло перерабатываются отдельно.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={sharePoint}
        >
          <Share2 size={20} color="#64748b" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.routeButton} 
          onPress={openMapsWithRoute}
        >
          <Navigation size={20} color="#ffffff" />
          <Text style={styles.routeButtonText}>Построить маршрут</Text>
        </TouchableOpacity>
      </View>
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
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  materialBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  materialBadgeText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  moreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  moreBadgeText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
    flex: 1,
  },
  linkText: {
    color: '#0891b2',
    textDecorationLine: 'underline',
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  descriptionIcon: {
    marginTop: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  materialsContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  materialsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  materialDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  materialText: {
    fontSize: 14,
    color: '#0f172a',
  },
  tipsContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  tipCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  shareButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginRight: 12,
  },
  routeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0891b2',
    paddingVertical: 12,
    borderRadius: 8,
  },
  routeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  backToMapButton: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backToMapText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 