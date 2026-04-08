import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, 
    shouldShowList: true,   
  }),
});

export const TODO_ACTIONS = {
  COMPLETE: 'complete-todo',
  DELETE: 'delete-todo',
};

export async function setupNotifications() {
  await Notifications.setNotificationCategoryAsync('todo-deadline', [
    {
      identifier: TODO_ACTIONS.COMPLETE,
      buttonTitle: '✅ Виконано',
      options: { isDestructive: false },
    },
    {
      identifier: TODO_ACTIONS.DELETE,
      buttonTitle: '🗑️ Видалити',
      options: { isDestructive: true },
    },
  ]);

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'custom_sound.wav', // Підключення кастомного звуку для Android
    });
  }
}

export async function scheduleTodoNotification(id: string, title: string, date: Date) {
  const triggerSeconds = Math.floor((date.getTime() - Date.now()) / 1000);
  if (triggerSeconds <= 0) return null;

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Дедлайн по завданню!",
      body: title,
      categoryIdentifier: 'todo-deadline',
      sound: 'custom_sound.wav', // Вказуємо кастомний звук для iOS
      data: { todoId: id },
    },
    trigger: { 
      seconds: triggerSeconds,
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL 
    },
  });
}