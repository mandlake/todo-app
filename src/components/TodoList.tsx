import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
