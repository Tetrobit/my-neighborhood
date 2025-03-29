# Руководство по тестированию

## Типы тестов

### Unit тесты
- Используется Jest
- Тестируются отдельные компоненты и функции
- Расположены рядом с тестируемым кодом (*.test.ts)

```bash
# Запуск unit тестов
npm run test
# или
yarn test
```

### Интеграционные тесты
- Тестируют взаимодействие компонентов
- Используется React Native Testing Library
- Расположены в папке `__tests__`

```bash
# Запуск интеграционных тестов
npm run test:integration
# или
yarn test:integration
```

### E2E тесты
- Используется Detox
- Тестируют приложение на реальных устройствах
- Расположены в папке e2e/

```bash
# Запуск E2E тестов на iOS
npm run e2e:ios
# или
yarn e2e:ios

# Запуск E2E тестов на Android
npm run e2e:android
# или
yarn e2e:android
```

## Структура тестов

```
MyLocal/
├── __tests__/                    # Интеграционные тесты
├── e2e/                         # E2E тесты
└── src/
    └── components/
        └── __tests__/          # Unit тесты компонентов
```

## Правила написания тестов

### Именование
- Файлы тестов должны иметь суффикс .test.ts или .test.tsx
- Описательные имена для describe и it блоков
- Группировка связанных тестов

```typescript
describe('UserCard', () => {
  describe('when user data is provided', () => {
    it('should display user name', () => {
      // test
    });

    it('should display user email', () => {
      // test
    });
  });
});
```

### Организация теста
- Следуйте паттерну AAA (Arrange, Act, Assert)
- Изолируйте тесты друг от друга
- Используйте моки для внешних зависимостей

```typescript
it('should update user profile', () => {
  // Arrange
  const user = createTestUser();
  const newName = 'John Doe';

  // Act
  const result = updateUserProfile(user, { name: newName });

  // Assert
  expect(result.name).toBe(newName);
});
```

## Моки и стабы

### API моки
- Используйте MSW для мока API
- Храните моки в `__mocks__/api`
- Документируйте поведение моков

```typescript
// __mocks__/api/users.ts
export const usersMock = {
  getUser: jest.fn().mockResolvedValue({
    id: '1',
    name: 'Test User',
    email: 'test@example.com'
  })
};
```

### Компоненты
- Мокайте сложные компоненты
- Используйте jest.mock для модулей
- Создавайте фабрики для тестовых данных

```typescript
// __mocks__/components/Map.tsx
jest.mock('@/components/Map', () => {
  return {
    Map: () => <div data-testid="map-mock" />
  };
});
```

## Покрытие кода

### Настройка
- Минимальное покрытие: 80%
- Исключите файлы конфигурации
- Генерируйте отчеты о покрытии

```bash
# Запуск тестов с отчетом о покрытии
npm run test:coverage
# или
yarn test:coverage
```

### Метрики
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## CI/CD

### GitHub Actions
- Запуск тестов при каждом PR
- Проверка покрытия кода
- Автоматическое обновление отчетов

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: yarn install
      - name: Run tests
        run: yarn test:coverage
```

## Отладка тестов

### Инструменты
- Jest Debug Config в VS Code
- React Native Debugger
- Chrome DevTools

### Советы
- Используйте console.log для отладки
- Запускайте отдельные тесты
- Проверяйте снэпшоты

## Ресурсы

### Документация
- [Jest](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Detox](https://wix.github.io/Detox/)

### Примеры
- Смотрите папку `examples/tests/`
- Изучайте существующие тесты
- Следуйте паттернам проекта 