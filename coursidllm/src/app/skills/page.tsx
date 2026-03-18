import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Skills Builder" };

const skillCategories = [
  {
    category: "Programming",
    skills: ["Python", "JavaScript/TypeScript", "SQL", "Java", "Go", "Rust"],
  },
  {
    category: "Data & AI",
    skills: ["Machine Learning", "Data Analysis", "Deep Learning", "LLM Prompting", "Statistics"],
  },
  {
    category: "Web Development",
    skills: ["React", "Next.js", "Node.js", "REST APIs", "GraphQL", "CSS/Tailwind"],
  },
  {
    category: "Design",
    skills: ["Figma", "UX Research", "Prototyping", "Accessibility", "Design Systems"],
  },
  {
    category: "Business",
    skills: ["Project Management", "Product Strategy", "Data Visualisation", "Leadership", "Agile/Scrum"],
  },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fa] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#a435f0]/10 text-[#a435f0] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🧩 Skills Builder
          </div>
          <h1 className="text-3xl font-extrabold text-[#1c1d1f] mb-3">
            What&apos;s your current skill level?
          </h1>
          <p className="text-[#6a6f73] text-lg">
            Rate yourself in each skill area. We&apos;ll identify gaps and build you a personalised learning path.
          </p>
        </div>

        <div className="space-y-6">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="bg-white border border-[#d1d7dc] rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-[#1c1d1f] mb-4">{cat.category}</h2>
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-[#3d3d3d] w-40 shrink-0">{skill}</span>
                    <div className="flex gap-2">
                      {["None", "Beginner", "Intermediate", "Advanced"].map((level) => (
                        <label key={level} className="flex flex-col items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`skill-${skill}`}
                            value={level}
                            className="accent-[#0056d2]"
                          />
                          <span className="text-xs text-[#6a6f73]">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-[#0056d2] hover:bg-[#004ab3] text-white font-bold px-10 py-3 rounded transition-colors duration-150 text-lg">
            Analyse My Skills →
          </button>
          <p className="text-xs text-[#6a6f73] mt-3">
            <Link href="/login" className="text-[#0056d2] hover:underline">Log in</Link>
            {" "}to save your results and track progress over time.
          </p>
        </div>
      </div>
    </div>
  );
}
