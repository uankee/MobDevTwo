import React, { useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Temperament = 'Сангвінік' | 'Холерик' | 'Флегматик' | 'Меланхолік' | null;

export default function TemperamentScreen() {
  const [result, setResult] = useState<Temperament>(null);

  const startTest = () => {
    setResult(null);
    
    Alert.alert(
      "Питання 1",
      "Ви зазвичай швидко приймаєте рішення та дієте енергійно?",
      [
        { text: "Так", onPress: () => askQuestion2('Холерик') },
        { text: "Ні", onPress: () => askQuestion2(null) }
      ]
    );
  };

  const askQuestion2 = (currentScore: Temperament) => {
    Alert.alert(
      "Питання 2",
      "Чи легко ви пристосовуєтеся до нових обставин і зберігаєте оптимізм?",
      [
        { text: "Так", onPress: () => askQuestion3(currentScore || 'Сангвінік') },
        { text: "Ні", onPress: () => askQuestion3(currentScore) }
      ]
    );
  };

  const askQuestion3 = (currentScore: Temperament) => {
    Alert.alert(
      "Питання 3",
      "Ви зазвичай спокійні, виважені та наполегливі в роботі?",
      [
        { text: "Так", onPress: () => askQuestion4(currentScore || 'Флегматик') },
        { text: "Ні", onPress: () => askQuestion4(currentScore) }
      ]
    );
  };

  const askQuestion4 = (currentScore: Temperament) => {
    Alert.alert(
      "Питання 4",
      "Ви часто буваєте занадто чутливими або схильними до роздумів?",
      [
        { text: "Так", onPress: () => finishTest(currentScore || 'Меланхолік') },
        { text: "Ні", onPress: () => finishTest(currentScore || 'Сангвінік') } 
      ]
    );
  };

  const finishTest = (finalResult: Temperament) => {
    setResult(finalResult);
    Alert.alert("Тест завершено", `Ваш тип темпераменту: ${finalResult}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Визначення темпераменту
      </ThemedText>

      <ThemedView style={styles.content}>
        {result ? (
          <ThemedView style={styles.resultContainer}>
            <ThemedText type="subtitle">Ваш результат:</ThemedText>
            <ThemedText style={styles.resultValue}>{result}</ThemedText>
          </ThemedView>
        ) : (
          <ThemedText style={styles.info}>
            Натисніть "Старт", щоб відповісти на 4 питання.
          </ThemedText>
        )}
      </ThemedView>

      <TouchableOpacity style={styles.button} onPress={startTest}>
        <ThemedText style={styles.buttonText}>
          {result ? "Почати знову" : "Старт"}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 40,
    textAlign: 'center',
  },
  content: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  info: {
    textAlign: 'center',
    opacity: 0.7,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});