import { Tabs } from 'expo-router';
import { Chrome as Home, Grid } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e5e5',
        },
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#64748b',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="miniapps"
        options={{
          title: 'Мини-приложения',
          tabBarIcon: ({ color, size }) => <Grid size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}