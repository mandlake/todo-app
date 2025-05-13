// types/todo.ts
export interface Todo {
  id: string;
  title: string;
  done: boolean;
  colorKey?: string; // ex: "yellow", "pink"
}
