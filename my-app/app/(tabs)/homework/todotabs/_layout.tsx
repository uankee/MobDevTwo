import { Tabs } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store'; 
import { Ionicons } from '@expo/vector-icons';
import { TodoProvider } from './TodoContext';

export default function TodoTabsLayout() {
  const incompleteCount = useSelector((state: RootState) => state.todo.incompleteCount);

  return (
    <TodoProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#0a7ea4' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Список',
            tabBarBadge: incompleteCount > 0 ? incompleteCount : undefined,
            tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
          }}
        />
        <Tabs.Screen name="details" options={{ title: 'Деталі' }} />
        <Tabs.Screen name="create" options={{ title: 'Створити' }} />
      </Tabs>
    </TodoProvider>
  );
}