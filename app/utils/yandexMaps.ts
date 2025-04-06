import { WebViewMessageEvent } from 'react-native-webview';
import { RecyclingPoint } from '../data/recyclingPoints';
import { MATERIAL_COLORS } from '../data/recyclingPoints';

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
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU" type="text/javascript"></script>
    <script type="text/javascript">
        // Глобальные переменные
        let map = null;
        let markers = [];
        let userLocationMarker = null;
        let currentRoute = null;
        let isMapReady = false;

        // Функция для отправки сообщений в React Native
        function postMessageToRN(message) {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify(message));
            }
        }

        // Инициализация карты
        function initMap() {
            try {
                ymaps.ready(() => {
                    try {
                        map = new ymaps.Map('map', {
                            center: [55.76, 37.64],
                            zoom: 12,
                            controls: ['zoomControl']
                        });

                        map.behaviors.disable('scrollZoom');
                        map.behaviors.disable('dblClickZoom');

                        isMapReady = true;
                        postMessageToRN({ type: 'MAP_READY' });
                    } catch (error) {
                        console.error('Ошибка при создании карты:', error);
                        postMessageToRN({ 
                            type: 'ERROR', 
                            message: 'Ошибка при создании карты: ' + error.message 
                        });
                    }
                });
            } catch (error) {
                console.error('Ошибка при инициализации API карт:', error);
                postMessageToRN({ 
                    type: 'ERROR', 
                    message: 'Ошибка при инициализации API карт: ' + error.message 
                });
            }
        }

        // Добавление маркеров на карту
        function addMarkers(points) {
            if (!isMapReady || !map) {
                console.warn('Карта не готова');
                return;
            }

            try {
                // Очищаем текущие маркеры
                clearMarkers();

                if (!points || !Array.isArray(points) || points.length === 0) {
                    console.warn('Нет точек для отображения');
                    return;
                }

                const bounds = new ymaps.GeoObjectCollection();

                points.forEach(point => {
                    if (!point.coordinates || !Array.isArray(point.coordinates)) {
                        console.warn('Некорректные координаты для точки:', point);
                        return;
                    }

                    const marker = new ymaps.Placemark(
                        point.coordinates,
                        {
                            hintContent: point.name,
                            balloonContent: createBalloonContent(point)
                        },
                        {
                            preset: 'islands#circleIcon',
                            iconColor: point.iconColor || '#0891b2'
                        }
                    );

                    marker.events.add('click', () => {
                        postMessageToRN({
                            type: 'MARKER_CLICK',
                            id: point.id
                        });
                    });

                    markers.push(marker);
                    bounds.add(marker);
                    map.geoObjects.add(marker);
                });

                // Устанавливаем границы карты, чтобы видеть все маркеры
                if (markers.length > 0) {
                    map.setBounds(bounds.getBounds(), {
                        checkZoomRange: true,
                        zoomMargin: 30
                    });
                }
            } catch (error) {
                console.error('Ошибка при добавлении маркеров:', error);
                postMessageToRN({ 
                    type: 'ERROR', 
                    message: 'Ошибка при добавлении маркеров: ' + error.message 
                });
            }
        }

        // Очистка маркеров
        function clearMarkers() {
            markers.forEach(marker => {
                if (map) {
                    map.geoObjects.remove(marker);
                }
            });
            markers = [];
        }

        // Добавление маркера местоположения пользователя
        function addUserLocation(coordinates) {
            if (!isMapReady || !map) {
                console.warn('Карта не готова');
                return;
            }

            try {
                if (!coordinates || !Array.isArray(coordinates)) {
                    throw new Error('Некорректные координаты');
                }

                if (userLocationMarker) {
                    map.geoObjects.remove(userLocationMarker);
                }

                userLocationMarker = new ymaps.Placemark(
                    coordinates,
                    {
                        hintContent: 'Вы здесь'
                    },
                    {
                        preset: 'islands#geolocationIcon',
                        iconColor: '#1976D2'
                    }
                );

                map.geoObjects.add(userLocationMarker);
                map.setCenter(coordinates, 14);
            } catch (error) {
                console.error('Ошибка при добавлении локации пользователя:', error);
                postMessageToRN({ 
                    type: 'ERROR', 
                    message: 'Ошибка при добавлении локации пользователя: ' + error.message 
                });
            }
        }

        // Создание содержимого балуна
        function createBalloonContent(point) {
            const materialsHtml = point.materials && point.materials.length
                ? '<p><strong>Принимает:</strong> ' + point.materials.join(', ') + '</p>'
                : '';

            const phoneHtml = point.phone
                ? '<p><strong>Телефон:</strong> ' + point.phone + '</p>'
                : '';

            return '<div style="font-family: Arial; max-width: 250px">' +
                   '<h3 style="margin-top: 0">' + point.name + '</h3>' +
                   '<p><strong>Адрес:</strong> ' + point.address + '</p>' +
                   materialsHtml +
                   '<p><strong>Режим работы:</strong> ' + point.workingHours + '</p>' +
                   phoneHtml +
                   (point.description ? '<p>' + point.description + '</p>' : '') +
                   '<button onclick="showDetails(\'' + point.id + '\')" ' +
                   'style="background-color: #0891b2; color: white; border: none; ' +
                   'padding: 8px 12px; border-radius: 4px; cursor: pointer; width: 100%;">' +
                   'Подробнее</button>' +
                   '</div>';
        }

        // Показать подробности о точке
        function showDetails(id) {
            postMessageToRN({
                type: 'SHOW_DETAILS',
                id: id
            });
        }

        // Построение маршрута
        function buildRoute(from, to) {
            if (!isMapReady || !map) {
                console.warn('Карта не готова');
                return;
            }

            try {
                if (!from || !to || !Array.isArray(from) || !Array.isArray(to)) {
                    throw new Error('Некорректные координаты маршрута');
                }

                // Удаляем предыдущий маршрут
                if (currentRoute) {
                    map.geoObjects.remove(currentRoute);
                    currentRoute = null;
                }

                ymaps.route([from, to], {
                    mapStateAutoApply: true
                }).then(route => {
                    currentRoute = route;
                    map.geoObjects.add(route);

                    const activeRoute = route.getActiveRoute();
                    if (activeRoute) {
                        const distance = activeRoute.properties.get("distance");
                        const duration = activeRoute.properties.get("duration");

                        postMessageToRN({
                            type: 'ROUTE_INFO',
                            distance: distance.text,
                            duration: duration.text
                        });

                        map.setBounds(route.getBounds(), {
                            checkZoomRange: true,
                            zoomMargin: 30
                        });
                    }
                }).catch(error => {
                    console.error('Ошибка при построении маршрута:', error);
                    postMessageToRN({ 
                        type: 'ERROR', 
                        message: 'Ошибка при построении маршрута: ' + error.message 
                    });
                });
            } catch (error) {
                console.error('Ошибка при вызове построения маршрута:', error);
                postMessageToRN({ 
                    type: 'ERROR', 
                    message: 'Ошибка при вызове построения маршрута: ' + error.message 
                });
            }
        }

        // Очистка маршрута
        function clearRoute() {
            if (currentRoute && map) {
                map.geoObjects.remove(currentRoute);
                currentRoute = null;
            }
        }

        // Обработчик сообщений из React Native
        window.handleMessage = function(messageStr) {
            try {
                const data = JSON.parse(messageStr);
                
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
                        clearRoute();
                        break;
                    default:
                        console.warn('Неизвестный тип сообщения:', data.type);
                }
            } catch (error) {
                console.error('Ошибка при обработке сообщения:', error);
                postMessageToRN({ 
                    type: 'ERROR', 
                    message: 'Ошибка при обработке сообщения: ' + error.message 
                });
            }
        };

        // Запускаем инициализацию карты
        initMap();
    </script>
</body>
</html>
`;

// Обработчик сообщений от WebView
export function handleWebViewMessage(
    event: WebViewMessageEvent,
    onMarkerClick: (id: string) => void,
    onMapReady: () => void,
    onShowDetails: (id: string) => void,
    onRouteInfo?: (distance: string, duration: string) => void,
    onError?: (message: string) => void
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
            case 'ERROR':
                if (onError) {
                    onError(data.message);
                } else {
                    console.error('Ошибка карты:', data.message);
                }
                break;
        }
    } catch (error) {
        console.error('Ошибка обработки сообщения от WebView:', error);
    }
}

// Форматирование точек для карты
export function formatRecyclingPointsForMap(
    points: RecyclingPoint[],
    selectedMaterials?: string[]
) {
    try {
        const filteredPoints = selectedMaterials && selectedMaterials.length > 0
            ? points.filter(point => 
                point.materials.some(material => selectedMaterials.includes(material))
            )
            : points;
            
        return filteredPoints.map(point => ({
            id: point.id,
            name: point.name,
            address: point.address,
            coordinates: [point.coordinates[1], point.coordinates[0]], // [lat, lon] для Яндекс.Карт
            materials: point.materials,
            description: point.description,
            workingHours: point.workingHours,
            phone: point.phone,
            iconColor: getIconColorForPoint(point)
        }));
    } catch (error) {
        console.error('Ошибка форматирования точек:', error);
        return [];
    }
}

// Определение цвета маркера
function getIconColorForPoint(point: RecyclingPoint): string {
    try {
        if (point.materials.length === 1) {
            return MATERIAL_COLORS[point.materials[0]] || '#0891b2';
        }
        return '#0891b2';
    } catch (error) {
        console.error('Ошибка определения цвета маркера:', error);
        return '#0891b2';
    }
} 