import { colorMap } from "../constants/colorMap";
import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const colorKey = todo.colorKey || "yellow";
  const { bg, text } = colorMap[colorKey as keyof typeof colorMap];

  return (
    <li
      className={`w-40 h-40 ${bg} rounded-lg shadow-md p-3 flex flex-col justify-between hover:scale-105 transition-transform duration-150`}
    >
      <label className="flex flex-col space-y-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="self-start"
        />
        <span
          className={`break-words ${text} ${
            todo.done ? "line-through opacity-50" : ""
          }`}
        >
          {todo.title}
        </span>
      </label>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-sm text-red-400 hover:text-red-500 self-end"
      >
        삭제
      </button>
    </li>
  );
}
