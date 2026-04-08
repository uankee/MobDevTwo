import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor 
} from 'react-native-reanimated';

export default function AnimationsScreen() {
  const [progress, setProgress] = useState(0);
  
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 600 });
  }, [progress]);

  const handleNext = () => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 25));
  };

  const animatedStyle = useAnimatedStyle(() => {
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
      
      <View style={styles.track}>
        <Animated.View style={[styles.progressBar, animatedStyle]}>
          <Text style={styles.progressText}>
            {progress > 0 ? `${progress}%` : ''}
          </Text>
        </Animated.View>
      </View>

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
    backgroundColor: '#e0e0e0',
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