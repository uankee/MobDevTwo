import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import { useDispatch } from 'react-redux';
import { setIncompleteCount } from '../../../slices/todoSlice';
import * as dbOrm from '../../../../services/db_orm';
import migrations from '../../../../drizzle/migrations';
import * as schema from '../../../../services/db_schema';

// Ініціалізація бази даних
const expoDb = openDatabaseSync('todos_v2.db');
const db = drizzle(expoDb, { schema });

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  deadline?: Date;
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string, deadline?: Date) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  selectedTodoId: number | null;
  setSelectedTodoId: (id: number | null) => void;
}

export const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const dispatch = useDispatch();
  
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;
    
    const loadTodos = async () => {
      const dbTodos = await dbOrm.getTodos(db);
      const formattedTodos = dbTodos.map((t: any) => ({
        id: t.id,
        title: t.title,
        completed: t.completed === 1,
        deadline: t.deadline ? new Date(t.deadline) : undefined,
      }));
      setTodos(formattedTodos);
      updateReduxBadge(formattedTodos);
    };
    
    loadTodos();
  }, [success]);

  const updateReduxBadge = (currentTodos: Todo[]) => {
    const incomplete = currentTodos.filter(t => !t.completed).length;
    dispatch(setIncompleteCount(incomplete));
  };

  const addTodo = async (title: string, deadline?: Date) => {
    const deadlineStr = deadline ? deadline.toISOString() : undefined;
    const newDbTodo = await dbOrm.addTodo(db, title, deadlineStr);
    
    const newTodo: Todo = {
      id: newDbTodo.id,
      title: newDbTodo.title,
      completed: false,
      deadline,
    };
    
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    updateReduxBadge(updatedTodos);
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    await dbOrm.toggleTodoStatus(db, id, todo.completed ? 1 : 0);
    
    const updatedTodos = todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
    updateReduxBadge(updatedTodos);
  };

  const deleteTodo = async (id: number) => {
    await dbOrm.deleteTodoItem(db, id);
    const updatedTodos = todos.filter(t => t.id !== id);
    setTodos(updatedTodos);
    updateReduxBadge(updatedTodos);
  };

  if (error) {
    console.error("Migration error:", error);
  }

  // САМЕ ТУТ БУЛА ПРОБЛЕМА: ми передали всі функції у value
  return (
    <TodoContext.Provider value={{ 
      todos, 
      addTodo, 
      toggleTodo, 
      deleteTodo, 
      selectedTodoId, 
      setSelectedTodoId 
    }}>
      {children}
    </TodoContext.Provider>
  );
};

// Хук для зручного використання контексту
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

// Заглушка, щоб Expo Router не вважав цей файл окремим екраном
export default function DummyScreen() { return null; }