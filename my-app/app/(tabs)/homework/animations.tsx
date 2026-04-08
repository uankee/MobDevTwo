import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor 
} from 'react-native-reanimated';

export default function AnimationsScreen() {
  // Стан для відстеження поточного відсотка (0, 25, 50, 75, 100)
  const [progress, setProgress] = useState(0);
  
  // Shared value для Reanimated (зберігає значення для анімації)
  const animatedProgress = useSharedValue(0);

  // Завдання 1: Плавна зміна ширини при оновленні state
  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 600 });
  }, [progress]);

  // Обробник натискання кнопки "next"
  const handleNext = () => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 25));
  };

  // Завдання 2: Анімовані стилі (ширина + залежність кольору від відсотка)
  const animatedStyle = useAnimatedStyle(() => {
    // Плавна зміна кольору відповідно до макета
    const backgroundColor = interpolateColor(
      animatedProgress.value,
      [0, 25, 50, 75, 100],
      [
        '#4caf50', // 0-25% (Зелений)
        '#4caf50', // 25% (Зелений)
        '#29b6f6', // 50% (Блакитний)
        '#ffca28', // 75% (Жовтий)
        '#ef5350'  // 100% (Червоний)
      ] 
    );

    return {
      width: `${animatedProgress.value}%`,
      backgroundColor,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TEMA: Animations. Reanimated</Text>
      
      {/* Контейнер прогрес-бару (сірий фон) */}
      <View style={styles.track}>
        <Animated.View style={[styles.progressBar, animatedStyle]}>
          <Text style={styles.progressText}>
            {progress > 0 ? `${progress}%` : ''}
          </Text>
        </Animated.View>
      </View>

      {/* Кнопка "next" */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#0056b3',
  },
  track: {
    height: 24,
    backgroundColor: '#e0e0e0', // Сірий фон незаповненої частини
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 40,
  },
  progressBar: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});