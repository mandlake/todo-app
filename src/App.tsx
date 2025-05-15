import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import { gapi } from "gapi-script";
import type { Todo } from "./types/todo";
import type { CalendarEvent } from "./types/calenderEvent";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ✅ 초기화: Google API Client
  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          console.log("Google API Initialized");
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error("Google API 초기화 실패:", error.message);
          } else {
            console.error("Google API 초기화 실패:", error);
          }
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  // ✅ 로그인 및 오늘 일정 불러오기
  const handleLoginAndFetch = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      await authInstance.signIn();

      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
      });

      const events = (response.result.items || []) as CalendarEvent[];
      const newTodos = events.map((event) => ({
        id: uuidv4(),
        title: event.summary || "(제목 없음)",
        done: false,
        colorKey: "yellow", // 기본 포스트잇 색상
      }));

      setTodos((prev) => [...prev, ...newTodos]);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "error" in error &&
        (error as { error: string }).error === "popup_closed_by_user"
      ) {
        console.warn("사용자가 로그인 창을 닫았습니다.");
      } else {
        console.error("Google 로그인 또는 일정 불러오기 실패", error);
      }
    }
  };

  const addTodo = (title: string, colorKey: string = "yellow") => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title,
        done: false,
        colorKey,
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
    <main className="min-h-screen bg-green-950 p-6">
      <div className="max-w-5xl mx-auto bg-green-800 rounded-xl p-8 shadow-inner">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl font-bold">오늘의 할 일</h1>
          <button
            onClick={handleLoginAndFetch}
            className="bg-white text-green-800 font-semibold px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            Google 일정 가져오기
          </button>
        </div>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </main>
  );
}
