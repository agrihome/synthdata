"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./scroll.css";

export default function Home() {
  const [messages, setMessages] = useState([]); // {role: "user"|"ai", text: string}
  const [value, setValue] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    const userMessage = { role: "user", text: value };
    setMessages((prev) => [...prev, userMessage]);
    setValue("");
    setStarted(true);
    setLoading(true);

    // simulate AI response (replace this with fetch to your backend)
    setTimeout(() => {
      const aiMessage = {
        role: "ai",
        text: `Synthetic data generated for: "${userMessage.text}"`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 800);
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // set new height
    }
  }, [value]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col p-10">
      <h1 className="text-3xl font-bold mb-2">
        Synthetic <span className="text-blue-400">DATA</span> Generator
      </h1>
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
            className="w-full max-w-xl relative   bg-gray-800 flex flex-col justify-between rounded-lg gap-2 "
          >
            <textarea
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="What do you want to generate today ?"
              className="w-full border-none outline-none text-lg text-md ::placeholder: p-5 h-[200px] scroll-width-none rounded-lg resize-none  "
            />
            <button
              type="submit"
              className="w-max h-max self-end   bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition flex items-center justify-center mb-5 mr-5"
            >
              <FaArrowUp />
            </button>
          </form>
        </div>
      )}

      {started && (
        <div className="px-6 py-6 space-y-4 pb-15 flex flex-col justify-between flex-1 relative">
          {/* Messages area */}
          <div
            ref={messagesEndRef}
            className="overflow-y-auto space-y-16 flex-1 max-h-[70vh] scrollbar-none"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex  ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none max-w-[55%] px-4 py-3 "
                      : " text-gray-100 p-10 max-w-5xl w-full  "
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loader bubble */}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-gray-800 text-gray-400 rounded-bl-none max-w-[55%] flex gap-2 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Input stays at bottom */}
          <form
            onSubmit={handleSubmit}
            className="w-full absolute bottom-0 left-0 flex flex-col"
          >
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
              placeholder="Chat here ..."
              className="w-full self-end bg-gray-800 border max-h-[200px] min-h-[60px] border-gray-700 rounded-2xl px-6 pr-14 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-fit h-fit absolute right-0 bottom-0 bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition flex items-center justify-center mb-2 mr-2 disabled:opacity-50"
            >
              <FaArrowUp />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
