import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { useTodos } from './TodoContext';

export default function TodoListScreen() {
  const { todos, toggleTodo, setSelectedTodoId } = useTodos();
  const router = useRouter();

  const handleSelect = (id: string) => {
    setSelectedTodoId(id);
    router.push('/homework/todotabs/details'); 
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ThemedText style={styles.empty}>Список порожній. Перейдіть у вкладку "Створити".</ThemedText>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item.id)}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={28}
                color={item.completed ? "#4CAF50" : "#ccc"}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <ThemedText style={[styles.title, item.completed && styles.completed]}>
                {item.title}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee', gap: 15 },
  textContainer: { flex: 1 },
  title: { fontSize: 18, color: '#000' },
  completed: { textDecorationLine: 'line-through', opacity: 0.5 },
  empty: { textAlign: 'center', marginTop: 50, color: '#666' }
});