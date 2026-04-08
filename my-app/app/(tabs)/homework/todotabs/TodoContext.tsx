import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';

// Змінено шлях імпорту (на 3 рівні вгору)
import { setIncompleteCount } from '../../../slices/todoSlice'; 
import { scheduleTodoNotification, setupNotifications, TODO_ACTIONS } from './notificationService';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  deadline?: string; 
  notificationId?: string;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  selectedTodoId: string | null;
  setSelectedTodoId: (id: string | null) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);
const STORAGE_KEY = '@todo_list_data';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue !== null) setTodos(JSON.parse(jsonValue));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      if (isLoaded) await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    };
    saveData();
  }, [todos, isLoaded]);

  useEffect(() => {
    setupNotifications();
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // Явне приведення типів TypeScript
      const actionIdentifier = response.actionIdentifier as string;
      const todoId = response.notification.request.content.data?.todoId as string;

      if (actionIdentifier === TODO_ACTIONS.COMPLETE && todoId) toggleTodo(todoId);
      if (actionIdentifier === TODO_ACTIONS.DELETE && todoId) deleteTodo(todoId);
    });
    return () => subscription.remove();
  }, [todos]);

  useEffect(() => {
    const incomplete = todos.filter(t => !t.completed).length;
    dispatch(setIncompleteCount(incomplete));
  }, [todos]);

  const addTodo = async (todo: Todo) => {
    let notifId = undefined;
    if (todo.deadline) {
      notifId = await scheduleTodoNotification(todo.id, todo.title, new Date(todo.deadline)) || undefined;
    }
    setTodos([...todos, { ...todo, notificationId: notifId }]);
  };

  const deleteTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(todo.notificationId);
    }
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    // Виправлено синтаксичну помилку з "..."
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, selectedTodoId, setSelectedTodoId }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
};