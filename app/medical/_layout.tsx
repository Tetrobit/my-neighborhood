import { Stack } from 'expo-router';

export default function MedicalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackVisible: true,
      }}
    />
  );
} 