import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const colorClass = todo.color || "bg-yellow-100";

  return (
    <li
      className={`w-40 h-40 ${colorClass} rounded-lg shadow-md p-3 flex flex-col justify-between hover:scale-105 transition-transform duration-150`}
    >
      <label className="flex flex-col space-y-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="self-start"
        />
        <span
          className={`break-words ${
            todo.done ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
      </label>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-sm text-red-500 hover:text-red-700 self-end"
      >
        삭제
      </button>
    </li>
  );
}
