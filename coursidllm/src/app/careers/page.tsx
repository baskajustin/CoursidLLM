import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Career Builder" };

const popularRoles = [
  { title: "AI/ML Engineer", icon: "🤖", skills: ["Python", "Machine Learning", "Deep Learning", "MLOps"] },
  { title: "Full Stack Developer", icon: "💻", skills: ["React", "Node.js", "SQL", "REST APIs"] },
  { title: "Data Scientist", icon: "📊", skills: ["Python", "Statistics", "SQL", "Data Visualisation"] },
  { title: "Product Manager", icon: "🚀", skills: ["Product Strategy", "Agile/Scrum", "Data Analysis", "Leadership"] },
  { title: "UX Designer", icon: "🎨", skills: ["Figma", "UX Research", "Prototyping", "Design Systems"] },
  { title: "DevOps Engineer", icon: "⚙️", skills: ["Docker", "Kubernetes", "CI/CD", "Cloud (AWS/GCP)"] },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fa] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#0056d2]/10 text-[#0056d2] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🚀 Career Builder
          </div>
          <h1 className="text-3xl font-extrabold text-[#1c1d1f] mb-3">
            Where do you want to go?
          </h1>
          <p className="text-[#6a6f73] text-lg max-w-xl mx-auto">
            Choose your target role and we&apos;ll map exactly what skills and courses you need to get there.
          </p>
        </div>

        {/* Role search */}
        <div className="bg-white border border-[#d1d7dc] rounded-xl p-6 shadow-sm mb-8">
          <label className="block text-sm font-semibold text-[#1c1d1f] mb-2">
            Target job role or industry
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. Machine Learning Engineer, Product Manager..."
              className="flex-1 border border-[#1c1d1f] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0056d2] focus:ring-2 focus:ring-blue-200 transition-colors duration-150"
            />
            <button className="bg-[#0056d2] hover:bg-[#004ab3] text-white font-semibold px-6 py-2.5 rounded transition-colors duration-150">
              Build Path
            </button>
          </div>
        </div>

        {/* Popular roles */}
        <h2 className="text-lg font-bold text-[#1c1d1f] mb-4">Popular career paths</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularRoles.map((role) => (
            <button
              key={role.title}
              className="bg-white border border-[#d1d7dc] rounded-xl p-5 shadow-sm hover:border-[#0056d2] hover:shadow-md transition-all duration-150 text-left"
            >
              <div className="text-3xl mb-3">{role.icon}</div>
              <h3 className="font-bold text-[#1c1d1f] text-sm mb-2">{role.title}</h3>
              <div className="flex flex-wrap gap-1">
                {role.skills.map((skill) => (
                  <span key={skill} className="text-xs bg-[#f7f9fa] border border-[#d1d7dc] text-[#6a6f73] px-2 py-0.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#6a6f73]">
            <Link href="/login" className="text-[#0056d2] font-semibold hover:underline">Log in</Link>
            {" "}to get personalised recommendations based on your completed courses.
          </p>
        </div>
      </div>
    </div>
  );
}
