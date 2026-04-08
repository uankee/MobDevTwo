import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useTodos } from './TodoContext';

export default function TodoDetailsScreen() {
  const { todos, selectedTodoId } = useTodos();
  
  const selectedTodo = todos.find(t => t.id === selectedTodoId);

  if (!selectedTodo) {
    return (
      <View style={styles.center}>
        <ThemedText style={styles.emptyText}>Оберіть завдання зі списку, щоб побачити деталі.</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>{selectedTodo.title}</ThemedText>
      
      <View style={styles.statusBox}>
        <ThemedText style={styles.statusLabel}>Статус виконання:</ThemedText>
        <ThemedText style={[styles.statusValue, { color: selectedTodo.completed ? '#4CAF50' : '#d9534f' }]}>
          {selectedTodo.completed ? "✅ Виконано" : "⏳ В процесі"}
        </ThemedText>
      </View>

      <ThemedText style={styles.descTitle}>Опис завдання:</ThemedText>
      <View style={styles.descBox}>
        <ThemedText style={styles.description}>
          {selectedTodo.description || "Опис відсутній."}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { marginBottom: 20, color: '#000' },
  statusBox: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30, backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8 },
  statusLabel: { fontSize: 16, color: '#666' },
  statusValue: { fontSize: 18, fontWeight: 'bold' },
  descTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#000' },
  descBox: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8, minHeight: 100 },
  description: { fontSize: 16, lineHeight: 24, color: '#333' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#666' }
});