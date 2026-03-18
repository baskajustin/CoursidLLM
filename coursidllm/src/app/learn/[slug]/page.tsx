import type { Metadata } from "next";
import ChatPanel from "./ChatPanel";

export const metadata: Metadata = { title: "Learning" };

const mockLessons = [
  { id: "1", title: "Welcome to the Course", duration: 420, completed: true },
  { id: "2", title: "History of AI", duration: 980, completed: true },
  { id: "3", title: "Types of AI Systems", duration: 1140, completed: false },
  { id: "4", title: "Real-world Applications", duration: 870, completed: false },
  { id: "5", title: "Machine Learning Basics", duration: 1560, completed: false },
];

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentLesson = mockLessons[2];

  return (
    <div className="flex h-[calc(100vh-92px)] bg-[#1c1d1f]">
      {/* Lesson sidebar */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-gray-700 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-white font-semibold text-sm">Course Content</h2>
          <p className="text-gray-400 text-xs mt-1">
            {slug.replace(/-/g, " ")}
          </p>
        </div>
        <ul className="flex-1">
          {mockLessons.map((lesson, i) => (
            <li key={lesson.id}>
              <button
                className={`w-full text-left px-4 py-3 flex items-start gap-3 border-b border-gray-700 transition-colors duration-150 ${
                  lesson.id === currentLesson.id
                    ? "bg-[#0056d2]/20"
                    : "hover:bg-gray-700/50"
                }`}
              >
                <span
                  className={`mt-0.5 text-xs font-bold shrink-0 ${
                    lesson.completed ? "text-[#1e7e34]" : "text-gray-500"
                  }`}
                >
                  {lesson.completed ? "✓" : `${i + 1}`}
                </span>
                <div>
                  <p className={`text-sm font-medium ${lesson.id === currentLesson.id ? "text-white" : "text-gray-300"}`}>
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatDuration(lesson.duration)}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content: video + chat */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video player */}
          <div className="aspect-video bg-black flex items-center justify-center shrink-0">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-white/20 transition-colors">
                <span className="text-white text-3xl ml-2">▶</span>
              </div>
              <p className="text-white font-semibold">{currentLesson.title}</p>
              <p className="text-gray-400 text-sm mt-1">{formatDuration(currentLesson.duration)}</p>
            </div>
          </div>

          {/* Lesson info below video */}
          <div className="bg-white flex-1 overflow-y-auto p-6">
            <h1 className="text-xl font-bold text-[#1c1d1f] mb-2">{currentLesson.title}</h1>
            <div className="flex gap-4 mb-6">
              <button className="text-sm font-semibold text-[#0056d2] border-b-2 border-[#0056d2] pb-1">Overview</button>
              <button className="text-sm text-[#6a6f73] pb-1 hover:text-[#0056d2]">Resources</button>
              <button className="text-sm text-[#6a6f73] pb-1 hover:text-[#0056d2]">Q&A</button>
            </div>
            <p className="text-[#3d3d3d] text-sm leading-relaxed">
              In this lesson, we explore the different types of AI systems — from rule-based expert systems
              to modern neural networks and large language models. You&apos;ll learn how to categorise AI by
              its capabilities, learning approach, and real-world use cases.
            </p>
            <div className="mt-6 flex gap-3">
              <button className="bg-[#0056d2] hover:bg-[#004ab3] text-white font-semibold px-5 py-2 rounded text-sm transition-colors duration-150">
                Mark Complete
              </button>
              <button className="border border-[#d1d7dc] text-[#3d3d3d] font-semibold px-5 py-2 rounded text-sm hover:bg-[#f7f9fa] transition-colors duration-150">
                Next Lesson →
              </button>
            </div>
          </div>
        </div>

        {/* AI Chat panel */}
        <ChatPanel lessonTitle={currentLesson.title} />
      </div>
    </div>
  );
}
