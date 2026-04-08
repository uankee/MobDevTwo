import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3; 

const initialCards = [
  { id: '1', color: '#FF6B6B', title: 'JS' },
  { id: '2', color: '#4ECDC4', title: 'React' },
  { id: '3', color: '#45B7D1', title: 'Native' },
  { id: '4', color: '#F7D794', title: 'Expo' },
];

export default function GesturesScreen() {
  const [cards, setCards] = useState(initialCards);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const moveCardToBottom = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const topCard = newCards.shift(); 
      if (topCard) {
        newCards.push(topCard); 
      }
      return newCards;
    });
    translateX.value = 0;
    translateY.value = 0;
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const isSwipedRight = event.translationX > SWIPE_THRESHOLD;
      const isSwipedLeft = event.translationX < -SWIPE_THRESHOLD;

      if (isSwipedRight || isSwipedLeft) {
        const endX = isSwipedRight ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
        translateX.value = withTiming(endX, { duration: 300 }, (isFinished) => {
          if (isFinished) {
            runOnJS(moveCardToBottom)();
          }
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>ТЕМА: Gesture Handler</Text>

      <View style={styles.deckContainer}>
        {cards.slice().reverse().map((card, reversedIndex) => {
          const index = cards.length - 1 - reversedIndex; 
          const isTopCard = index === 0;

          const animatedStyle = useAnimatedStyle(() => {
            if (isTopCard) {
              const rotate = interpolate(
                translateX.value,
                [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
                [-15, 0, 15],
                Extrapolation.CLAMP
              );

              return {
                transform: [
                  { translateX: translateX.value },
                  { translateY: translateY.value },
                  { rotate: `${rotate}deg` },
                ],
              };
            }

            const scale = 1 - index * 0.05;
            const topOffset = index * 15;

            return {
              transform: [{ translateY: topOffset }, { scale }],
            };
          });

          if (isTopCard) {
            return (
              <GestureDetector key={card.id} gesture={panGesture}>
                <Animated.View style={[styles.card, { backgroundColor: card.color }, animatedStyle]}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                </Animated.View>
              </GestureDetector>
            );
          }

          return (
            <Animated.View key={card.id} style={[styles.card, { backgroundColor: card.color }, animatedStyle]}>
              <Text style={styles.cardTitle}>{card.title}</Text>
            </Animated.View>
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  deckContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 1.1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});