"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  lessonTitle: string;
}

export default function ChatPanel({ lessonTitle }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI tutor for this lesson — **${lessonTitle}**. Ask me anything about the content and I'll help you understand it deeply. 🎓`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          lessonTitle,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Failed to get response");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content || "";
              assistantMessage += delta;
              setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: "assistant", content: assistantMessage },
              ]);
            } catch {
              // ignore parse errors for non-JSON lines
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect to the AI tutor. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col bg-white border-l border-[#d1d7dc]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#d1d7dc] flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#a435f0] flex items-center justify-center text-white text-xs font-bold">
          AI
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#1c1d1f]">AI Tutor</h3>
          <p className="text-xs text-[#6a6f73]">Powered by Claude</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#0056d2] text-white rounded-br-sm"
                  : "bg-[#f7f9fa] text-[#3d3d3d] border border-[#d1d7dc] rounded-bl-sm"
              }`}
            >
              {msg.content || (isLoading && msg.role === "assistant" ? (
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#6a6f73] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#6a6f73] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#6a6f73] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              ) : null)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#d1d7dc]">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this lesson..."
            disabled={isLoading}
            className="flex-1 text-sm border border-[#d1d7dc] rounded-lg px-3 py-2 focus:outline-none focus:border-[#0056d2] focus:ring-2 focus:ring-blue-200 disabled:opacity-50 transition-colors duration-150"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[#0056d2] hover:bg-[#004ab3] disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors duration-150"
            aria-label="Send"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-[#6a6f73] mt-2 text-center">
          Questions are scoped to this lesson&apos;s content
        </p>
      </form>
    </div>
  );
}
