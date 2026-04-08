import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const TODO_ACTIONS = {
  COMPLETE: 'COMPLETE_TODO',
  DELETE: 'DELETE_TODO',
};

export async function setupNotifications() {
  await Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true, 
      shouldShowList: true,  
    }),
  });

  await Notifications.setNotificationCategoryAsync('todo-deadline', [
    {
      identifier: TODO_ACTIONS.COMPLETE,
      buttonTitle: 'Виконати (Complete)',
      options: { opensAppToForeground: false },
    },
    {
      identifier: TODO_ACTIONS.DELETE,
      buttonTitle: 'Видалити (Delete)',
      options: { isDestructive: true, opensAppToForeground: false },
    },
  ]);

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('todo-channel', {
      name: 'Дедлайни ToDo',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'custom_sound.wav',
    });
  }
}

export async function scheduleTodoNotification(id: string, title: string, deadline: Date) {
  const hasPermission = await Notifications.requestPermissionsAsync();
  if (!hasPermission.granted) return null;

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: '⏳ Дедлайн завдання!',
      body: `Час виконати: ${title}`,
      data: { todoId: id },
      categoryIdentifier: 'todo-deadline', 
      sound: 'custom_sound.wav', 
    },
    trigger: {
      date: deadline,
      channelId: 'todo-channel', 
    },
  });

  return notificationId;
}