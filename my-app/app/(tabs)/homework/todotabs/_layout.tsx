import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { TodoProvider } from './TodoContext';

export default function TodoTabsLayout() {
  const incompleteCount = useSelector((state: RootState) => state.todo.incompleteCount);

  return (
    <TodoProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#0a7ea4', headerShown: true }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Мої Завдання',
            tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
            tabBarBadge: incompleteCount > 0 ? incompleteCount : undefined,
          }}
        />
        <Tabs.Screen
          name="details"
          options={{
            title: 'Деталі',
            tabBarIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Створити',
            tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} />,
          }}
        />
      </Tabs>
    </TodoProvider>
  );
}