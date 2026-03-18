import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, lessonTitle, lessonContent } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const systemPrompt = `You are an expert AI tutor for an online learning platform called CoursidLLM.
You are currently helping a student who is watching the lesson: "${lessonTitle}".
${lessonContent ? `\nLesson content context:\n${lessonContent}` : ""}

Your role:
- Answer questions clearly and concisely, scoped to this lesson's topic
- Use examples and analogies to explain complex concepts
- Be encouraging and patient
- If a question is outside the lesson scope, gently redirect to relevant resources
- Format answers with markdown where helpful (bullet points, code blocks, etc.)
- Keep responses focused and educational`;

    const anthropicMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: anthropicMessages,
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({
                choices: [{ delta: { content: event.delta.text } }],
              });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[API /chat POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
