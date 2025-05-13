import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const colors = [
    "bg-yellow-100",
    "bg-pink-100",
    "bg-green-100",
    "bg-blue-100",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <li
      className={`w-40 h-40 ${randomColor} rounded-lg shadow-md p-3 flex flex-col justify-between hover:scale-105 transition-transform duration-150`}
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
