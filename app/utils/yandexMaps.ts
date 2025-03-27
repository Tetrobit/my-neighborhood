import { WebViewMessageEvent } from 'react-native-webview';
import { RecyclingPoint } from '../data/recyclingPoints';

// HTML-шаблон для Яндекс Карт
export const yandexMapHTML = (apiKey: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
        html, body, #map {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
        }
    </style>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU" type="text/javascript"></script>
    <script type="text/javascript">
        var map;
        var markers = [];
        var userLocationMarker;
        
        function init() {
            map = new ymaps.Map('map', {
                center: [55.76, 37.64], // Москва
                zoom: 12,
                controls: ['zoomControl']
            });
            
            // Отправляем сообщение в React Native о готовности карты
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'MAP_READY'
            }));
        }
        
        // Добавление маркеров на карту
        function addMarkers(points) {
            // Очищаем предыдущие маркеры
            clearMarkers();
            
            points.forEach(function(point) {
                var marker = new ymaps.Placemark(
                    point.coordinates,
                    {
                        hintContent: point.name,
                        balloonContent: createBalloonContent(point)
                    },
                    {
                        preset: 'islands#greenDotIcon',
                        iconColor: point.iconColor || '#0891b2'
                    }
                );
                
                marker.id = point.id;
                markers.push(marker);
                map.geoObjects.add(marker);
                
                marker.events.add('click', function() {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'MARKER_CLICK',
                        id: point.id
                    }));
                });
            });
            
            // Устанавливаем зум и центр, чтобы охватить все маркеры
            if (markers.length > 0) {
                map.setBounds(map.geoObjects.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 30
                });
            }
        }
        
        // Очистка маркеров с карты
        function clearMarkers() {
            markers.forEach(function(marker) {
                map.geoObjects.remove(marker);
            });
            markers = [];
        }
        
        // Добавление отметки текущей локации пользователя
        function addUserLocation(coords) {
            if (userLocationMarker) {
                map.geoObjects.remove(userLocationMarker);
            }
            
            userLocationMarker = new ymaps.Placemark(
                coords,
                {
                    hintContent: 'Вы здесь'
                },
                {
                    preset: 'islands#blueCircleDotIcon'
                }
            );
            
            map.geoObjects.add(userLocationMarker);
            map.setCenter(coords);
        }
        
        // Создание HTML для всплывающей подсказки
        function createBalloonContent(point) {
            var materialsHtml = '';
            if (point.materials && point.materials.length) {
                materialsHtml = '<p><strong>Принимает:</strong> ' + point.materials.join(', ') + '</p>';
            }
            
            var phoneHtml = '';
            if (point.phone) {
                phoneHtml = '<p><strong>Телефон:</strong> ' + point.phone + '</p>';
            }
            
            return '<div style="font-family: Arial; max-width: 250px">' +
                   '<h3 style="margin-top: 0">' + point.name + '</h3>' +
                   '<p><strong>Адрес:</strong> ' + point.address + '</p>' +
                   materialsHtml +
                   '<p><strong>Режим работы:</strong> ' + point.workingHours + '</p>' +
                   phoneHtml +
                   (point.description ? '<p>' + point.description + '</p>' : '') +
                   '<button style="background-color: #0891b2; color: white; border: none; padding: 8px 12px; ' +
                   'border-radius: 4px; cursor: pointer;" ' +
                   'onclick="showDetails(\'' + point.id + '\')">Подробнее</button>' +
                   '</div>';
        }
        
        // Обработка клика по кнопке "Подробнее"
        function showDetails(id) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'SHOW_DETAILS',
                id: id
            }));
        }
        
        // Получение маршрута до точки
        function buildRoute(fromCoords, toCoords) {
            ymaps.route([
                fromCoords,
                toCoords
            ]).then(function (route) {
                if (window.currentRoute) {
                    map.geoObjects.remove(window.currentRoute);
                }
                window.currentRoute = route;
                map.geoObjects.add(route);
                
                // Отправить дистанцию и время в React Native
                var activeRoute = route.getActiveRoute();
                var distance = activeRoute.properties.get("distance");
                var duration = activeRoute.properties.get("duration");
                
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'ROUTE_INFO',
                    distance: distance.text,
                    duration: duration.text
                }));
                
                // Установить границы карты, чтобы маршрут был виден
                map.setBounds(route.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 30
                });
            });
        }
        
        // Обработчик сообщений из React Native
        window.handleMessage = function(message) {
            var data = JSON.parse(message);
            switch(data.type) {
                case 'ADD_MARKERS':
                    addMarkers(data.points);
                    break;
                case 'USER_LOCATION':
                    addUserLocation(data.coords);
                    break;
                case 'BUILD_ROUTE':
                    buildRoute(data.from, data.to);
                    break;
                case 'CLEAR_ROUTE':
                    if (window.currentRoute) {
                        map.geoObjects.remove(window.currentRoute);
                        window.currentRoute = null;
                    }
                    break;
            }
        };
        
        ymaps.ready(init);
    </script>
</head>
<body>
    <div id="map"></div>
</body>
</html>
`;

// Функция для обработки сообщений от WebView
export function handleWebViewMessage(
  event: WebViewMessageEvent,
  onMarkerClick: (id: string) => void,
  onMapReady: () => void,
  onShowDetails: (id: string) => void,
  onRouteInfo?: (distance: string, duration: string) => void
) {
  try {
    const data = JSON.parse(event.nativeEvent.data);
    
    switch (data.type) {
      case 'MARKER_CLICK':
        onMarkerClick(data.id);
        break;
      case 'MAP_READY':
        onMapReady();
        break;
      case 'SHOW_DETAILS':
        onShowDetails(data.id);
        break;
      case 'ROUTE_INFO':
        if (onRouteInfo) {
          onRouteInfo(data.distance, data.duration);
        }
        break;
    }
  } catch (error) {
    console.error('Error parsing message from WebView:', error);
  }
}

// Функция для отправки сообщений в WebView
export function formatRecyclingPointsForMap(
  points: RecyclingPoint[],
  selectedMaterials?: string[]
) {
  // Если выбраны материалы, фильтруем точки
  const filteredPoints = selectedMaterials && selectedMaterials.length > 0
    ? points.filter(point => 
        point.materials.some(material => selectedMaterials.includes(material))
      )
    : points;
    
  return filteredPoints.map(point => ({
    id: point.id,
    name: point.name,
    address: point.address,
    coordinates: [point.coordinates[1], point.coordinates[0]], // Преобразуем [lon, lat] в [lat, lon] для Яндекс.Карт
    materials: point.materials,
    description: point.description,
    workingHours: point.workingHours,
    phone: point.phone,
    iconColor: getIconColorForPoint(point)
  }));
}

// Функция для определения цвета маркера в зависимости от принимаемых материалов
function getIconColorForPoint(point: RecyclingPoint): string {
  // Если точка принимает только один тип материалов, используем его цвет
  if (point.materials.length === 1) {
    return MATERIAL_COLORS[point.materials[0]] || '#0891b2';
  }
  
  // Иначе используем цвет по умолчанию
  return '#0891b2';
}

// Импортируем цвета материалов
import { MATERIAL_COLORS } from '../data/recyclingPoints'; 