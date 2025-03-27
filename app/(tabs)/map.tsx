import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { 
  MapPin, 
  Recycle, 
  ChevronDown, 
  X, 
  Navigation, 
  Info, 
  Phone,
  Clock
} from 'lucide-react-native';

import { RECYCLING_POINTS, MATERIAL_COLORS } from '../data/recyclingPoints';
import { yandexMapHTML, handleWebViewMessage, formatRecyclingPointsForMap } from '../utils/yandexMaps';

// Yandex Maps API key - в реальном приложении храните в .env файле
const YANDEX_API_KEY = '50e2f3f3-eeb0-4bf5-a45b-dcff8e53d266';

export default function MapScreen() {
  const router = useRouter();
  const webViewRef = useRef<WebView>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<null | [number, number]>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showMaterialsFilter, setShowMaterialsFilter] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<null | string>(null);
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '' });

  // Получаем уникальный список всех материалов для фильтра
  const allMaterials = Array.from(
    new Set(RECYCLING_POINTS.flatMap((point) => point.materials))
  ).sort();

  // Запрашиваем разрешение на доступ к местоположению
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setLocationPermissionDenied(true);
          setIsLoading(false);
          return;
        }
        
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation([latitude, longitude]);
      } catch (error) {
        console.error('Error getting location:', error);
        setLocationPermissionDenied(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Обновляем маркеры при изменении фильтров или готовности карты
  useEffect(() => {
    if (isMapReady) {
      const formattedPoints = formatRecyclingPointsForMap(RECYCLING_POINTS, selectedMaterials);
      sendMessageToWebView({
        type: 'ADD_MARKERS',
        points: formattedPoints
      });
      
      // Если локация пользователя доступна, отправляем ее
      if (userLocation) {
        sendMessageToWebView({
          type: 'USER_LOCATION',
          coords: userLocation
        });
      }
    }
  }, [isMapReady, selectedMaterials, userLocation]);

  // Отправка сообщения в WebView
  const sendMessageToWebView = (message: any) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `window.handleMessage('${JSON.stringify(message)}'); true;`
      );
    }
  };

  // Обработка событий нажатия на маркер
  const handleMarkerClick = (id: string) => {
    setSelectedPoint(id);
  };

  // Обработка события готовности карты
  const handleMapReady = () => {
    setIsMapReady(true);
  };

  // Обработка события нажатия на кнопку "Подробнее"
  const handleShowDetails = (id: string) => {
    // Redirect to the dedicated recycling details page
    router.push({
      pathname: '/recycling/[id]',
      params: { id }
    });
  };

  // Обработка информации о маршруте
  const handleRouteInfo = (distance: string, duration: string) => {
    setRouteInfo({ distance, duration });
    setShowRouteInfo(true);
  };

  // Построение маршрута до выбранной точки
  const buildRoute = () => {
    if (!userLocation || !selectedPoint) return;
    
    const point = RECYCLING_POINTS.find((p) => p.id === selectedPoint);
    if (!point) return;
    
    // Отправляем координаты для построения маршрута
    sendMessageToWebView({
      type: 'BUILD_ROUTE',
      from: userLocation,
      to: [point.coordinates[1], point.coordinates[0]] // [lat, lon] для Яндекс.Карт
    });
  };

  // Очистка маршрута
  const clearRoute = () => {
    sendMessageToWebView({
      type: 'CLEAR_ROUTE'
    });
    setShowRouteInfo(false);
  };

  // Переключение выбора материала в фильтре
  const toggleMaterialSelection = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  // Получение выбранной точки
  const getSelectedPointDetails = () => {
    if (!selectedPoint) return null;
    return RECYCLING_POINTS.find((p) => p.id === selectedPoint);
  };

  // Модальное окно с подробной информацией о точке
  const renderPointDetails = () => {
    const point = getSelectedPointDetails();
    if (!point) return null;

    return (
      <Modal
        visible={!!selectedPoint}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPoint(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{point.name}</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setSelectedPoint(null)}
              >
                <X size={20} color="#0f172a" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.addressContainer}>
                <MapPin size={18} color="#64748b" />
                <Text style={styles.addressText}>{point.address}</Text>
              </View>
              
              <View style={styles.workingHoursContainer}>
                <Clock size={18} color="#64748b" />
                <Text style={styles.workingHoursText}>{point.workingHours}</Text>
              </View>
              
              {point.phone && (
                <TouchableOpacity 
                  style={styles.phoneContainer}
                  onPress={() => {
                    // Handle phone call
                    if (point.phone) {
                      Linking.openURL(`tel:${point.phone}`);
                    }
                  }}
                >
                  <Phone size={18} color="#0891b2" />
                  <Text style={styles.phoneText}>{point.phone}</Text>
                </TouchableOpacity>
              )}
              
              {point.description && (
                <View style={styles.descriptionContainer}>
                  <Info size={18} color="#64748b" />
                  <Text style={styles.descriptionText}>{point.description}</Text>
                </View>
              )}
              
              <View style={styles.materialsContainer}>
                <Text style={styles.materialsTitle}>Принимаемые материалы:</Text>
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
            </ScrollView>
            
            {userLocation && (
              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={styles.routeButton} 
                  onPress={() => {
                    buildRoute();
                    setSelectedPoint(null);
                  }}
                >
                  <Navigation size={18} color="#ffffff" />
                  <Text style={styles.routeButtonText}>Построить маршрут</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  // Рендеринг информации о маршруте
  const renderRouteInfo = () => {
    if (!showRouteInfo) return null;

    return (
      <View style={styles.routeInfoContainer}>
        <View style={styles.routeInfoContent}>
          <Text style={styles.routeInfoText}>
            <Text style={styles.routeInfoLabel}>Расстояние: </Text>
            {routeInfo.distance}
          </Text>
          <Text style={styles.routeInfoText}>
            <Text style={styles.routeInfoLabel}>Время пути: </Text>
            {routeInfo.duration}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.clearRouteButton} 
          onPress={clearRoute}
        >
          <X size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  };

  // Рендеринг фильтра материалов
  const renderMaterialsFilter = () => {
    return (
      <Modal
        visible={showMaterialsFilter}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMaterialsFilter(false)}
      >
        <View style={styles.filterModalOverlay}>
          <View style={styles.filterModalContent}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Выберите материалы</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowMaterialsFilter(false)}
              >
                <X size={20} color="#0f172a" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.filterModalBody}>
              {allMaterials.map((material) => (
                <TouchableOpacity
                  key={material}
                  style={[
                    styles.filterItem,
                    selectedMaterials.includes(material) && styles.filterItemSelected
                  ]}
                  onPress={() => toggleMaterialSelection(material)}
                >
                  <View style={[
                    styles.materialDot,
                    { backgroundColor: MATERIAL_COLORS[material] }
                  ]} />
                  <Text 
                    style={[
                      styles.filterItemText,
                      selectedMaterials.includes(material) && styles.filterItemTextSelected
                    ]}
                  >
                    {material}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.filterModalFooter}>
              <TouchableOpacity 
                style={styles.clearFilterButton} 
                onPress={() => setSelectedMaterials([])}
              >
                <Text style={styles.clearFilterText}>Очистить фильтр</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyFilterButton} 
                onPress={() => setShowMaterialsFilter(false)}
              >
                <Text style={styles.applyFilterText}>Применить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Основной рендеринг экрана
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Пункты переработки</Text>
      </View>
      
      <View style={styles.filterButton}>
        <Pressable 
          style={styles.filterButtonContent} 
          onPress={() => setShowMaterialsFilter(true)}
        >
          <Recycle size={18} color="#0891b2" />
          <Text style={styles.filterButtonText}>
            {selectedMaterials.length > 0 
              ? `${selectedMaterials.length} выбрано` 
              : 'Фильтр по материалам'}
          </Text>
          <ChevronDown size={16} color="#64748b" />
        </Pressable>
      </View>
      
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0891b2" />
        </View>
      ) : locationPermissionDenied ? (
        <View style={styles.permissionDeniedContainer}>
          <Text style={styles.permissionDeniedText}>
            Для отображения карты необходим доступ к вашему местоположению.
          </Text>
          <Pressable
            style={styles.permissionButton}
            onPress={async () => {
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status === 'granted') {
                setLocationPermissionDenied(false);
                setIsLoading(true);
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setUserLocation([latitude, longitude]);
                setIsLoading(false);
              }
            }}
          >
            <Text style={styles.permissionButtonText}>Запросить доступ</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <WebView
            ref={webViewRef}
            source={{ html: yandexMapHTML(YANDEX_API_KEY) }}
            style={styles.map}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={(event) => handleWebViewMessage(
              event,
              handleMarkerClick,
              handleMapReady,
              handleShowDetails,
              handleRouteInfo
            )}
          />
        </View>
      )}
      
      {renderPointDetails()}
      {renderMaterialsFilter()}
      {renderRouteInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
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
  filterButton: {
    margin: 12,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterButtonText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#64748b',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionDeniedText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#0891b2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    padding: 16,
    maxHeight: 400,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  addressText: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
    flex: 1,
  },
  workingHoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  workingHoursText: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  phoneText: {
    fontSize: 16,
    color: '#0891b2',
    marginLeft: 12,
    textDecorationLine: 'underline',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 12,
    flex: 1,
  },
  materialsContainer: {
    marginBottom: 16,
  },
  materialsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  materialsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  materialDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  materialText: {
    fontSize: 14,
    color: '#0f172a',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  routeButton: {
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
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  filterModalBody: {
    padding: 16,
    maxHeight: 400,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  filterItemSelected: {
    backgroundColor: '#f0f9ff',
  },
  filterItemText: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
  },
  filterItemTextSelected: {
    fontWeight: '600',
    color: '#0891b2',
  },
  filterModalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  clearFilterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  clearFilterText: {
    color: '#64748b',
    fontSize: 16,
  },
  applyFilterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0891b2',
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
  },
  applyFilterText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  routeInfoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  routeInfoContent: {
    flex: 1,
  },
  routeInfoText: {
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 4,
  },
  routeInfoLabel: {
    fontWeight: '600',
  },
  clearRouteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 16,
  },
}); 