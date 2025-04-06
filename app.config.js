module.exports = {
  name: 'WeLocal',
  slug: 'welocal',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.welocal.app',
    infoPlist: {
      NSLocationWhenInUseUsageDescription: "Приложению нужен доступ к геолокации для отображения вашего местоположения на карте",
      NSLocationAlwaysUsageDescription: "Приложению нужен доступ к геолокации для отображения вашего местоположения на карте"
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.welocal.app',
    permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION']
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: "Разрешите доступ к местоположению для отображения вашей позиции на карте"
      }
    ]
  ]
}; 