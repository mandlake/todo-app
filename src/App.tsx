import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string, colorKey?: string) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title,
        done: false,
        colorKey: colorKey || "yellow", // 기본은 노랑
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main>
      <div>
        <h1>오늘의 할일</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </main>
  );
}
