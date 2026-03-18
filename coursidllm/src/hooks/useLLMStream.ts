"use client";

import { useState, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseLLMStreamOptions {
  lessonTitle: string;
  lessonContent?: string;
}

export function useLLMStream({ lessonTitle, lessonContent }: UseLLMStreamOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim() || isStreaming) return;

      setError(null);
      const updatedMessages: Message[] = [
        ...messages,
        { role: "user", content: userMessage },
      ];
      setMessages(updatedMessages);
      setIsStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages,
            lessonTitle,
            lessonContent,
          }),
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

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
      } catch (err) {
        setError("Failed to get a response. Please try again.");
        console.error("[useLLMStream]", err);
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming, lessonTitle, lessonContent]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isStreaming, error, sendMessage, clearMessages };
}
