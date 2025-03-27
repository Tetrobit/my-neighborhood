# Руководство по стилю кода

## Общие правила

### Именование

- Используйте camelCase для переменных и функций
- Используйте PascalCase для компонентов и интерфейсов
- Используйте UPPER_SNAKE_CASE для констант
- Используйте понятные и описательные имена

```typescript
// Правильно
const userName = 'John';
function calculateTotal() {}
interface UserProfile {}
const MAX_RETRY_COUNT = 3;

// Неправильно
const user_name = 'John';
function calc() {}
interface user_profile {}
const maxRetryCount = 3;
```

### Форматирование

- Используйте 2 пробела для отступов
- Максимальная длина строки - 100 символов
- Используйте точки с запятой
- Используйте одинарные кавычки для строк

```typescript
// Правильно
import { View } from 'react-native';

const Component = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
};

// Неправильно
import { View } from "react-native";

const Component = () => {
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
        </View>
    );
};
```

## React Native

### Компоненты

- Используйте функциональные компоненты
- Используйте хуки вместо классов
- Разделяйте логику и представление
- Используйте мемоизацию где необходимо

```typescript
// Правильно
const UserCard = memo(({ user }: UserCardProps) => {
  const { name, email } = user;
  
  return (
    <View style={styles.card}>
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  );
});

// Неправильно
class UserCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text>{this.props.user.name}</Text>
        <Text>{this.props.user.email}</Text>
      </View>
    );
  }
}
```

### Стили

- Используйте StyleSheet.create
- Группируйте связанные стили
- Используйте константы для повторяющихся значений
- Избегайте инлайн-стилей

```typescript
// Правильно
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
  },
});

// Неправильно
<View style={{ flex: 1, padding: 16 }}>
  <Text style={{ color: 'red' }}>Hello</Text>
</View>
```

## TypeScript

### Типы

- Используйте интерфейсы для объектов
- Используйте type для union types
- Избегайте any
- Используйте enum для констант

```typescript
// Правильно
interface User {
  id: string;
  name: string;
  email: string;
}

type Status = 'active' | 'inactive' | 'pending';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

// Неправильно
type User = {
  id: any;
  name: any;
  email: any;
}
```

### Импорты

- Группируйте импорты
- Используйте абсолютные пути
- Удаляйте неиспользуемые импорты

```typescript
// Правильно
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { UserCard } from '@/components';
import { colors, spacing } from '@/constants';

// Неправильно
import { View, Text } from 'react-native';
import React from 'react';
import { UserCard } from '../../../components';
```

## Тестирование

### Jest

- Используйте describe для группировки тестов
- Используйте it для описания тестов
- Следуйте паттерну AAA (Arrange, Act, Assert)

```typescript
// Правильно
describe('UserCard', () => {
  it('should render user information correctly', () => {
    // Arrange
    const user = { name: 'John', email: 'john@example.com' };
    
    // Act
    const { getByText } = render(<UserCard user={user} />);
    
    // Assert
    expect(getByText('John')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
  });
});
```

## Git

### Коммиты

- Используйте префиксы для типов изменений
- Пишите понятные сообщения
- Разделяйте изменения на логические коммиты

```bash
# Правильно
git commit -m "feat: add user profile screen"
git commit -m "fix: resolve map loading issue"
git commit -m "docs: update README.md"

# Неправильно
git commit -m "update"
git commit -m "fix"
```

### Ветки

- Используйте feature/ для новых функций
- Используйте fix/ для исправлений
- Используйте hotfix/ для срочных исправлений

```bash
# Правильно
git checkout -b feature/user-profile
git checkout -b fix/map-loading
git checkout -b hotfix/crash-fix

# Неправильно
git checkout -b new-feature
git checkout -b bugfix
``` 