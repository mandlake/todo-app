"use client";

import { useState } from "react";
import { colorMap } from "../constants/colorMap";

interface Props {
  onAdd: (text: string, color?: string) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [colorKey, setColorKey] = useState<keyof typeof colorMap>("yellow");

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text, colorKey);
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
          className={`${colorMap[colorKey].bg} ${colorMap[colorKey].button} px-4 py-2 rounded shadow`}
        >
          추가
        </button>
      </div>
      <div className="flex space-x-2">
        {Object.keys(colorMap).map((key) => (
          <div
            key={key}
            onClick={() => setColorKey(key as keyof typeof colorMap)}
            className={`w-6 h-6 rounded-full cursor-pointer border ${
              colorKey === key ? "ring-1 ring-black" : ""
            } ${colorMap[key as keyof typeof colorMap].bg}`}
          />
        ))}
      </div>
    </div>
  );
}
