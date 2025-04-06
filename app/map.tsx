import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const YANDEX_API_KEY = '50e2f3f3-eeb0-4bf5-a45b-dcff8e53d266';

interface LocationState {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const MapScreen = () => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      }
      setLoading(false);
    })();
  }, []);

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU" type="text/javascript"></script>
        <style>
          html, body, #map {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          ymaps.ready(() => {
            const map = new ymaps.Map('map', {
              center: [55.76, 37.64],
              zoom: 10
            });

            // Добавляем маркеры пунктов переработки
            const points = [
              { coordinates: [55.755864, 37.617698], name: 'ЭкоПункт "Зелёный город"' },
              { coordinates: [55.765864, 37.627698], name: 'ЭкоБокс' },
              { coordinates: [55.745864, 37.607698], name: 'Раздельный сбор' }
            ];

            points.forEach(point => {
              const marker = new ymaps.Placemark(
                point.coordinates,
                { hintContent: point.name },
                { preset: 'islands#greenDotIcon' }
              );
              map.geoObjects.add(marker);
            });

            // Если есть координаты пользователя, добавляем его маркер
            if (window.userLocation) {
              const userMarker = new ymaps.Placemark(
                window.userLocation,
                { hintContent: 'Вы здесь' },
                { preset: 'islands#blueCircleDotIcon' }
              );
              map.geoObjects.add(userMarker);
              map.setCenter(window.userLocation, 12);
            }
          });
        </script>
      </body>
    </html>
  `;

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0891b2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        style={styles.map}
        source={{ html: mapHtml }}
        onLoad={() => {
          if (location) {
            const coords = [location.coords.latitude, location.coords.longitude];
            const script = `window.userLocation = [${coords[0]}, ${coords[1]}];`;
            // @ts-ignore
            this.webview.injectJavaScript(script);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  }
});

export default MapScreen; 