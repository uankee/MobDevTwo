import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  completed: int().default(0).notNull(), 
  deadline: text(),
});

export type TodoTable = typeof todosTable.$inferSelect;