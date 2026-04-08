import React from 'react';
import { StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';

export default function ParticipantBScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <ThemedText type="subtitle" style={styles.header}>Дані водія Б та його авто</ThemedText>
      <TextInput style={styles.input} placeholder="Ім'я та Прізвище" />
      <TextInput style={styles.input} placeholder="Дата народження (ДД.ММ.РРРР)" />
      <TextInput style={styles.input} placeholder="Телефон" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Модель автомобіля" />
      <TextInput style={styles.input} placeholder="Державний номер" />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/homework/europrotocol/damage')}>
        <ThemedText style={styles.buttonText}>Далі (Опис пошкоджень)</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { marginBottom: 20, color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#0a7ea4', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});