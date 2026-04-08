import { Stack } from 'expo-router';

export default function EuroProtocolLayout() {
  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: '#0a7ea4' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
      <Stack.Screen name="index" options={{ title: 'Європротокол' }} />
      <Stack.Screen name="participantA" options={{ title: 'Учасник А' }} />
      <Stack.Screen name="participantB" options={{ title: 'Учасник Б' }} />
      <Stack.Screen name="damage" options={{ title: 'Пошкодження та Ескіз' }} />
    </Stack>
  );
}