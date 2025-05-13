"use client";

import { useState } from "react";

interface Props {
  onAdd: (text: string, color?: string) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text, color);
      setText("");
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <div className="flex space-x-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="할 일을 입력하세요"
          className="border p-2 rounded flex-grow"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 rounded"
        >
          추가
        </button>
      </div>
      <div className="flex space-x-2">
        {["bg-yellow-100", "bg-pink-100", "bg-green-100", "bg-blue-100"].map(
          (c) => (
            <div
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full cursor-pointer border ${
                color === c ? "ring-2 ring-black" : ""
              } ${c}`}
            />
          )
        )}
      </div>
    </div>
  );
}
