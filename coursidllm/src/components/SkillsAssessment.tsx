"use client";

import { useState } from "react";
import Link from "next/link";

interface Skill {
  name: string;
  level: "None" | "Beginner" | "Intermediate" | "Advanced";
}

interface SkillCategory {
  category: string;
  skills: string[];
}

interface SkillsAssessmentProps {
  categories: SkillCategory[];
  onComplete?: (skills: Skill[]) => void;
}

export default function SkillsAssessment({ categories, onComplete }: SkillsAssessmentProps) {
  const [assessedSkills, setAssessedSkills] = useState<Record<string, Skill["level"]>>({});
  const [submitted, setSubmitted] = useState(false);

  function setSkillLevel(skill: string, level: Skill["level"]) {
    setAssessedSkills((prev) => ({ ...prev, [skill]: level }));
  }

  function handleSubmit() {
    const skills: Skill[] = Object.entries(assessedSkills).map(([name, level]) => ({ name, level }));
    setSubmitted(true);
    onComplete?.(skills);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-[#1c1d1f] mb-2">Assessment complete!</h2>
        <p className="text-[#6a6f73] mb-6">
          We&apos;re generating your personalised learning path based on your skills.
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-[#0056d2] hover:bg-[#004ab3] text-white font-semibold px-8 py-3 rounded transition-colors duration-150"
        >
          View Recommended Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.category} className="bg-white border border-[#d1d7dc] rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-[#1c1d1f] mb-4">{cat.category}</h2>
          <div className="space-y-3">
            {cat.skills.map((skill) => (
              <div key={skill} className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-sm text-[#3d3d3d] min-w-[140px]">{skill}</span>
                <div className="flex gap-2 flex-wrap">
                  {(["None", "Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSkillLevel(skill, level)}
                      className={`text-xs px-3 py-1 rounded-full border transition-colors duration-150 ${
                        assessedSkills[skill] === level
                          ? "bg-[#0056d2] border-[#0056d2] text-white"
                          : "border-[#d1d7dc] text-[#6a6f73] hover:border-[#0056d2] hover:text-[#0056d2]"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-[#0056d2] hover:bg-[#004ab3] text-white font-bold px-10 py-3 rounded transition-colors duration-150 text-lg"
        >
          Analyse My Skills →
        </button>
      </div>
    </div>
  );
}
