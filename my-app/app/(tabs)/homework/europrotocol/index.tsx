import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function StartScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Оформлення Європротоколу</ThemedText>
      
      <Link href="/homework/europrotocol/participantA" asChild>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>ОФОРМИТИ ПРОТОКОЛ</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { marginBottom: 40, textAlign: 'center' },
  button: { backgroundColor: '#0a7ea4', padding: 20, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});