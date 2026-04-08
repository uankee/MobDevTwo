import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { useTodos } from './TodoContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateTodoScreen() {
  const { addTodo } = useTodos();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState(new Date(Date.now() + 60000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Помилка', 'Будь ласка, введіть назву завдання');
      return;
    }

    if (deadline.getTime() <= Date.now()) {
      Alert.alert('Помилка', 'Дедлайн має бути у майбутньому часі');
      return;
    }
    
    // ОСЬ ТУТ ГОЛОВНЕ ВИПРАВЛЕННЯ:
    // Тепер ми передаємо просто текст і дату, як того вимагає SQLite!
    await addTodo(title, deadline);
    
    // Успішно повертаємось назад
    router.push('/homework/todotabs');
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const newDate = new Date(deadline);
      newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      setDeadline(newDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const newDate = new Date(deadline);
      newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setDeadline(newDate);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>Назва завдання:</ThemedText>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Що потрібно зробити?"
      />

      <ThemedText style={styles.label}>Дедлайн:</ThemedText>
      
      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <ThemedText style={styles.dateText}>{deadline.toLocaleDateString()}</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowTimePicker(true)}>
          <ThemedText style={styles.dateText}>{deadline.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</ThemedText>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker value={deadline} mode="date" display="default" onChange={onDateChange} />
      )}
      
      {showTimePicker && (
        <DateTimePicker value={deadline} mode="time" display="default" onChange={onTimeChange} />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <ThemedText style={styles.saveButtonText}>ЗБЕРЕГТИ</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
  dateContainer: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  dateButton: { flex: 1, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, alignItems: 'center' },
  dateText: { fontSize: 16, color: '#333' },
  saveButton: { backgroundColor: '#0a7ea4', padding: 15, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});