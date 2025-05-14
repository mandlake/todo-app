"use client";

import { useEffect, useState } from "react";
import { initGoogleClient } from "./google/googleClient";
import { signInWithGoogle } from "./google/googleLogin";
import { fetchTodayEvents } from "./google/fetchTodayEvents";

export default function App() {
  const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    initGoogleClient();
  }, []);

  const handleLoginAndFetch = async () => {
    await signInWithGoogle();
    const events = await fetchTodayEvents();
    setTodos(events);
  };

  return (
    <main className="min-h-screen bg-green-950 p-6 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">오늘의 캘린더 일정</h1>
        <button
          onClick={handleLoginAndFetch}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Google 로그인 및 일정 불러오기
        </button>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-yellow-100 text-black px-4 py-2 rounded shadow"
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
