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
  const [description, setDescription] = useState('');
  
  // Нові стани для дедлайну
  const [deadline, setDeadline] = useState(new Date(Date.now() + 60000)); // За замовчуванням +1 хвилина
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Помилка', 'Будь ласка, введіть назву завдання');
      return;
    }

    if (deadline.getTime() <= Date.now()) {
      Alert.alert('Помилка', 'Дедлайн має бути у майбутньому часі');
      return;
    }
    
    addTodo({
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      deadline: deadline.toISOString() // Зберігаємо дедлайн
    });

    Alert.alert('Успіх', 'Завдання успішно додано!');
    setTitle('');
    setDescription('');
    setDeadline(new Date(Date.now() + 60000));
    
    router.push('/homework/todotabs');
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate;
      setDeadline(currentDate);
      if (Platform.OS === 'android') {
        // На Android після дати показуємо вибір часу
        setShowTimePicker(true);
      }
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDeadline = new Date(deadline);
      newDeadline.setHours(selectedTime.getHours());
      newDeadline.setMinutes(selectedTime.getMinutes());
      setDeadline(newDeadline);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.label}>Коротка назва</ThemedText>
      <TextInput 
        style={styles.input} 
        placeholder="Що потрібно зробити?" 
        value={title}
        onChangeText={setTitle}
      />

      <ThemedText type="subtitle" style={styles.label}>Детальний опис</ThemedText>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Додайте більше деталей..." 
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <ThemedText type="subtitle" style={styles.label}>Дедлайн</ThemedText>
      <View style={styles.dateContainer}>
        <ThemedText style={styles.dateText}>
          {deadline.toLocaleDateString('uk-UA')} {deadline.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
        </ThemedText>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <ThemedText style={styles.dateButtonText}>Змінити</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Пікер для Android (окремо дата, окремо час) */}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker value={deadline} mode="date" display="default" onChange={onDateChange} />
      )}
      {Platform.OS === 'android' && showTimePicker && (
        <DateTimePicker value={deadline} mode="time" display="default" onChange={onTimeChange} />
      )}

      {/* Пікер для iOS (все разом) */}
      {Platform.OS === 'ios' && showDatePicker && (
        <DateTimePicker 
          value={deadline} 
          mode="datetime" 
          display="default" 
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDeadline(date);
          }} 
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <ThemedText style={styles.buttonText}>ЗБЕРЕГТИ ЗАВДАННЯ</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { marginBottom: 5, marginTop: 15, color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, fontSize: 16, backgroundColor: '#fafafa' },
  textArea: { height: 120, textAlignVertical: 'top' },
  button: { backgroundColor: '#0a7ea4', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  dateContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, backgroundColor: '#fafafa' },
  dateText: { fontSize: 16 },
  dateButton: { backgroundColor: '#e0e0e0', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  dateButtonText: { color: '#333', fontWeight: '500' }
});