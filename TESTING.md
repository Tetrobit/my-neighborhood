# Тестирование

Этот документ описывает процесс тестирования в проекте WeLocal.

## 🧪 Настройка тестирования

Проект использует следующие инструменты для тестирования:

- Jest - фреймворк для тестирования
- React Native Testing Library - библиотека для тестирования React Native компонентов
- Jest Expo - пресет Jest для Expo проектов

### Конфигурация

1. `jest.config.js` - основная конфигурация Jest
2. `jest.setup.js` - настройки для тестового окружения
3. `__tests__/` - директория с тестами

## 📝 Написание тестов

### Структура тестов

Тесты организованы по следующей структуре:

```
__tests__/
├── screens/           # Тесты экранов
├── components/        # Тесты компонентов
├── hooks/            # Тесты хуков
└── utils/            # Тесты утилит
```

### Пример теста

```typescript
import { render, screen } from '@testing-library/react-native';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
```

### Основные принципы

1. Тестируйте поведение, а не реализацию
2. Используйте `testID` для поиска элементов
3. Группируйте связанные тесты с помощью `describe`
4. Используйте `beforeEach` для настройки тестового окружения

## 🚀 Запуск тестов

### Команды

```bash
# Запуск всех тестов
npm test

# Запуск тестов в режиме watch
npm run test:watch

# Запуск тестов с покрытием
npm run test:coverage
```

### Покрытие кода

Минимальные требования к покрытию:
- 80% строк кода
- 80% веток
- 80% функций
- 80% операторов

## 🔧 Моки

### Моки для внешних зависимостей

В `jest.setup.js` определены моки для:
- expo-router
- expo-constants
- expo-secure-store
- expo-location
- react-native-maps
- react-native-reanimated

### Создание моков

```typescript
// Мок хука
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: '1' },
    signIn: jest.fn(),
    signOut: jest.fn(),
  }),
}));

// Мок компонента
jest.mock('@/components/Map', () => 'MapView');
```

## 📱 Тестирование нативных компонентов

### Особенности

1. Используйте `@testing-library/react-native` вместо `@testing-library/react`
2. Используйте `fireEvent` для симуляции нативных событий
3. Учитывайте различия между платформами

### Пример

```typescript
import { fireEvent } from '@testing-library/react-native';

it('handles press events', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button onPress={onPress} />);
  
  fireEvent.press(getByText('Press me'));
  expect(onPress).toHaveBeenCalled();
});
```

## 🔍 Отладка тестов

### Полезные команды

```bash
# Запуск конкретного теста
npm test -- -t "test name"

# Запуск тестов в конкретном файле
npm test -- path/to/test.tsx

# Запуск тестов с подробным выводом
npm test -- --verbose
```

### Инструменты

1. Jest Inspector - для отладки тестов
2. React Native Debugger - для отладки компонентов
3. Chrome DevTools - для отладки асинхронного кода

## 📚 Дополнительные ресурсы

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Expo Testing Guide](https://docs.expo.dev/guides/testing-with-jest/) 