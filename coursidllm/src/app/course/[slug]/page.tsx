import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Course Detail" };

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = {
    slug,
    title: "Introduction to Artificial Intelligence",
    description:
      "Master the fundamentals of AI — from machine learning and neural networks to large language models and real-world applications. This course is designed for complete beginners and takes you from zero to confident in AI concepts.",
    instructor: "Dr. Sarah Chen",
    instructorBio: "PhD in Computer Science (MIT). Former Research Scientist at DeepMind. 10+ years teaching AI at university level.",
    rating: 4.8,
    students: 12450,
    price: 49.99,
    isFree: false,
    level: "BEGINNER",
    category: "Technology",
    language: "English",
    lastUpdated: "March 2026",
    totalLessons: 42,
    totalHours: 18.5,
    syllabus: [
      { section: "Module 1: What is AI?", lessons: ["History of AI", "Types of AI systems", "Real-world applications"] },
      { section: "Module 2: Machine Learning Basics", lessons: ["Supervised learning", "Unsupervised learning", "Model evaluation"] },
      { section: "Module 3: Neural Networks", lessons: ["Perceptrons", "Backpropagation", "Deep learning intro"] },
      { section: "Module 4: Large Language Models", lessons: ["How LLMs work", "Prompt engineering", "Building with APIs"] },
    ],
    learningOutcomes: [
      "Understand the core concepts and history of artificial intelligence",
      "Build and train basic machine learning models",
      "Implement neural networks from scratch",
      "Use LLM APIs (including Claude) to build AI-powered apps",
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#1c1d1f] text-white px-4 py-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-[#a435f0] font-semibold uppercase tracking-wide">{course.category}</span>
              <span className="text-gray-400">·</span>
              <span className="text-xs text-gray-400">{course.level}</span>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight mb-3">{course.title}</h1>
            <p className="text-gray-300 mb-4">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
              <span className="flex items-center gap-1">
                <span className="text-amber-400 font-bold">{course.rating}</span>
                <span className="text-amber-400">★★★★★</span>
                <span>({course.students.toLocaleString()} students)</span>
              </span>
              <span>· {course.totalLessons} lessons</span>
              <span>· {course.totalHours}h total</span>
              <span>· Updated {course.lastUpdated}</span>
              <span>· {course.language}</span>
            </div>
            <p className="text-sm">
              Created by{" "}
              <span className="text-[#0056d2] font-semibold">{course.instructor}</span>
            </p>
          </div>

          {/* Enrol card */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white text-[#1c1d1f] rounded-xl shadow-xl p-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <span className="text-5xl">▶</span>
              </div>
              <div className="mb-4">
                {course.isFree ? (
                  <span className="text-3xl font-extrabold text-[#1e7e34]">Free</span>
                ) : (
                  <span className="text-3xl font-extrabold">${course.price}</span>
                )}
              </div>
              <Link
                href="/login"
                className="block w-full bg-[#0056d2] hover:bg-[#004ab3] text-white font-bold py-3 rounded text-center transition-colors duration-150 mb-3"
              >
                Enrol Now
              </Link>
              <p className="text-xs text-[#6a6f73] text-center">30-day money-back guarantee</p>
              <ul className="mt-4 space-y-2 text-sm text-[#3d3d3d]">
                <li>✅ {course.totalHours} hours on-demand video</li>
                <li>✅ AI Tutor (Claude) included</li>
                <li>✅ Certificate of completion</li>
                <li>✅ Full lifetime access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-10">
          {/* Learning outcomes */}
          <section>
            <h2 className="text-xl font-bold text-[#1c1d1f] mb-4">What you&apos;ll learn</h2>
            <div className="border border-[#d1d7dc] rounded-xl p-6 grid sm:grid-cols-2 gap-3">
              {course.learningOutcomes.map((outcome) => (
                <p key={outcome} className="flex items-start gap-2 text-sm text-[#3d3d3d]">
                  <span className="text-[#1e7e34] font-bold mt-0.5">✓</span>
                  {outcome}
                </p>
              ))}
            </div>
          </section>

          {/* Syllabus */}
          <section>
            <h2 className="text-xl font-bold text-[#1c1d1f] mb-4">Course content</h2>
            <div className="border border-[#d1d7dc] rounded-xl overflow-hidden divide-y divide-[#d1d7dc]">
              {course.syllabus.map((module) => (
                <div key={module.section}>
                  <div className="bg-[#f7f9fa] px-5 py-3">
                    <h3 className="text-sm font-semibold text-[#1c1d1f]">{module.section}</h3>
                  </div>
                  <ul className="divide-y divide-[#d1d7dc]">
                    {module.lessons.map((lesson) => (
                      <li key={lesson} className="px-5 py-3 flex items-center gap-3 text-sm text-[#3d3d3d]">
                        <span className="text-[#6a6f73]">▶</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-xl font-bold text-[#1c1d1f] mb-4">Instructor</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#0056d2] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {course.instructor[0]}
              </div>
              <div>
                <h3 className="font-bold text-[#0056d2]">{course.instructor}</h3>
                <p className="text-sm text-[#6a6f73] mt-1">{course.instructorBio}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
