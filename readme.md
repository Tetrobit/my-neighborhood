# Мой район

Мобильное приложение для жителей района, помогающее находить местные бизнесы и пункты переработки отходов. Приложение построено на React Native с использованием Expo и включает интеграцию с Яндекс.Картами.

## 📱 Основные функции

- 🗺️ Интерактивная карта района с пунктами переработки
- 🏪 Каталог местных бизнесов с отзывами
- 🔍 Поиск и фильтрация по категориям
- 📱 Адаптивный дизайн для iOS и Android
- 🌍 Экологические инициативы и советы

## 🛠️ Технологии

- React Native
- Expo
- TypeScript
- Яндекс.Карты API
- React Navigation
- Styled Components

## 📋 Требования

- Node.js 16+
- npm или yarn
- Expo CLI
- iOS Simulator (для macOS) или Android Studio (для Android)

## 🚀 Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Tetrobit/WeLocal.git
cd WeLocal
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Создайте файл `.env` в корне проекта на основе `.env.example`:
```env
YANDEX_MAPS_API_KEY=your_api_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

4. Запустите приложение:

Для iOS:
```bash
npm run ios
# или
yarn ios
```

Для Android:
```bash
npm run android
# или
yarn android
```

Для веб-версии:
```bash
npm run web
# или
yarn web
```

## 📖 Документация

- [CHANGELOG.md](CHANGELOG.md) - История изменений проекта
- [CONTRIBUTING.md](CONTRIBUTING.md) - Руководство по внесению изменений
- [LICENSE.md](LICENSE.md) - Лицензия MIT
- [SECURITY.md](SECURITY.md) - Политика безопасности
- [STYLE_GUIDE.md](STYLE_GUIDE.md) - Руководство по стилю кода
- [TESTING.md](TESTING.md) - Руководство по тестированию
- [TODO.md](TODO.md) - Планы развития проекта

## 📁 Структура проекта

```
WeLocal/
├── app/                    # Основной код приложения
│   ├── (tabs)/            # Вкладки приложения
│   ├── business/          # Страницы бизнесов
│   ├── recycling/         # Страницы пунктов переработки
│   ├── _layout.tsx        # Корневой layout
│   └── index.tsx          # Главная страница
├── assets/                # Статические ресурсы
│   ├── fonts/            # Шрифты
│   └── images/           # Изображения
├── components/           # Переиспользуемые компоненты
├── constants/            # Константы и конфигурация
├── data/                 # Данные приложения
├── utils/               # Вспомогательные функции
├── __tests__/          # Тесты
└── docs/               # Документация
```

## 🚀 Деплой

### iOS
1. Создайте аккаунт разработчика Apple
2. Настройте сертификаты и профили в Apple Developer Portal
3. Соберите приложение:
```bash
eas build --platform ios
```
4. Отправьте в App Store:
```bash
eas submit --platform ios
```

### Android
1. Создайте аккаунт разработчика Google Play
2. Соберите APK или AAB:
```bash
eas build --platform android
```
3. Отправьте в Google Play:
```bash
eas submit --platform android
```

## 🧪 Тестирование

```bash
# Unit тесты
npm run test

# Интеграционные тесты
npm run test:integration

# E2E тесты
npm run e2e:ios
npm run e2e:android

# Проверка покрытия
npm run test:coverage
```

## 🤝 Участие в проекте

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Отправьте PR

Подробнее в [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 Лицензия

MIT. См. [LICENSE.md](LICENSE.md)

## 🔒 Безопасность

По вопросам безопасности см. [SECURITY.md](SECURITY.md)

## 📞 Поддержка

При возникновении проблем создавайте issue в репозитории проекта.
