import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const homeworks = [
  { id: '1', title: 'Завдання 1: Тест на темперамент', route: '/homework/temperament' },
  { id: '2', title: 'Завдання 2: Todo List (API)', route: '/homework/todos' },
  { id: '3', title: 'Завдання 3: Європротокол (Stack)', route: '/homework/europrotocol' },
  { id: '4', title: 'Завдання 4: ToDo List (Tabs)', route: '/homework/todotabs' },
  { id: '5', title: 'Завдання 5: Анімації', route: '/homework/animations' },
];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Мої Домашні Завдання</ThemedText>
      
      <FlatList
        data={homeworks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={item.route as any} asChild>
            <TouchableOpacity style={styles.item}>
              <ThemedText style={styles.itemText}>{item.title}</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          </Link>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { marginBottom: 30 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center'
  },
  itemText: { fontSize: 18 },
});