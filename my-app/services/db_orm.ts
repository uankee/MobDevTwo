import * as schema from "./db_schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { eq } from "drizzle-orm";
import { todosTable } from "./db_schema";

type DrizzleDb = ExpoSQLiteDatabase<typeof schema> & {
  $client: SQLiteDatabase;
};

export async function getTodos(db: DrizzleDb) {
  return await db.select().from(todosTable);
}

export async function addTodo(db: DrizzleDb, title: string, deadline?: string) {
  const result = await db.insert(todosTable).values({ 
    title, 
    deadline: deadline || null, 
    completed: 0 
  });
  return {
    id: Number(result.lastInsertRowId),
    title,
    deadline: deadline || null,
    completed: 0
  };
}

export async function toggleTodoStatus(db: DrizzleDb, id: number, currentCompleted: number) {
  const newStatus = currentCompleted === 0 ? 1 : 0;
  await db.update(todosTable)
    .set({ completed: newStatus })
    .where(eq(todosTable.id, id));
  return newStatus;
}

export async function deleteTodoItem(db: DrizzleDb, id: number) {
  await db.delete(todosTable).where(eq(todosTable.id, id));
}