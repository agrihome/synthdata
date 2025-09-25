"use client";

import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function Home() {
  const [messages, setMessages] = useState([]); // {role: "user"|"ai", text: string}
  const [value, setValue] = useState("");
  const [started, setStarted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    const userMessage = { role: "user", text: value };
    setMessages((prev) => [...prev, userMessage]);
    setValue("");
    setStarted(true);

    // simulate AI response (replace this with fetch to your backend)
    setTimeout(() => {
      const aiMessage = {
        role: "ai",
        text: `Synthetic data generated for: "${userMessage.text}"`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Greeting before chat starts */}
      {!started && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl font-bold mb-2">
            Hello, <span className="text-blue-400">ADHITHAN</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Want to try out a few things?
          </p>

          {/* First input centered with embedded button */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl relative h-[200px]  bg-gray-800 flex flex-col justify-between p-5 gap-3 rounded-lg"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="What do you want to generate today ?"
              className="w-full bg-gray-800 border-none outline-none text-lg h-16 text-md"
            />
            <button
              type="submit"
              className="w-max h-max self-end  bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaArrowUp />
            </button>
          </form>
        </div>
      )}

      {/* Chat section after start */}
      {started && (
        <div className="flex-1 flex flex-col px-6 py-6 space-y-4">
          {/* Messages area */}
          <div className="overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl max-w-xs ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-800 text-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input stays at bottom for chat */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl relative mt-5 ml-auto"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask here..."
              className="w-full bg-gray-800 border border-gray-700 rounded-full px-6 pr-14 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaArrowUp />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
