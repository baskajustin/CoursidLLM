"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface LLMChatProps {
  lessonTitle: string;
  lessonContent?: string;
}

export default function LLMChat({ lessonTitle, lessonContent }: LLMChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI tutor. Ask me anything about **${lessonTitle}** and I'll help you understand it. 🎓`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    const updatedMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, lessonTitle, lessonContent }),
      });

      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const delta = JSON.parse(data)?.choices?.[0]?.delta?.content ?? "";
            reply += delta;
            setMessages((prev) => [
              ...prev.slice(0, -1),
              { role: "assistant", content: reply },
            ]);
          } catch { /* ignore */ }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#d1d7dc] flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-full bg-[#a435f0] flex items-center justify-center text-white text-xs font-bold">AI</div>
        <div>
          <p className="text-sm font-bold text-[#1c1d1f]">AI Tutor</p>
          <p className="text-xs text-[#6a6f73]">Powered by Claude</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#0056d2] text-white rounded-br-sm"
                  : "bg-[#f7f9fa] border border-[#d1d7dc] text-[#3d3d3d] rounded-bl-sm"
              }`}
            >
              {msg.content || (
                <span className="flex gap-1">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 bg-[#6a6f73] rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="p-3 border-t border-[#d1d7dc] shrink-0">
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
            className="bg-[#0056d2] hover:bg-[#004ab3] disabled:opacity-50 text-white px-3 py-2 rounded-lg transition-colors duration-150"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
