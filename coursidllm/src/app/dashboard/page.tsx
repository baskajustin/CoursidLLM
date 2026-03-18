import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

const enrolledCourses = [
  { slug: "intro-to-ai", title: "Introduction to Artificial Intelligence", progress: 45, totalLessons: 42, completedLessons: 19 },
  { slug: "web-dev-bootcamp", title: "Full Stack Web Development Bootcamp", progress: 12, totalLessons: 68, completedLessons: 8 },
];

const certificates = [
  { courseTitle: "Python for Beginners", issuedAt: "2026-01-15" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fa] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1c1d1f] mb-8">My Learning Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Enrolled Courses", value: "2" },
            { label: "Completed", value: "1" },
            { label: "Hours Learned", value: "24" },
            { label: "Certificates", value: "1" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-[#d1d7dc] rounded-xl p-5 shadow-sm text-center">
              <div className="text-2xl font-extrabold text-[#0056d2]">{stat.value}</div>
              <div className="text-xs text-[#6a6f73] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* In-progress courses */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-[#1c1d1f] mb-4">Continue Learning</h2>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.slug} className="bg-white border border-[#d1d7dc] rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-[#0056d2]/10 flex items-center justify-center text-2xl shrink-0">
                  🎓
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1c1d1f] text-sm">{course.title}</h3>
                  <p className="text-xs text-[#6a6f73] mt-1">
                    {course.completedLessons} / {course.totalLessons} lessons
                  </p>
                  <div className="mt-2 h-2 bg-[#f7f9fa] border border-[#d1d7dc] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0056d2] rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#6a6f73] mt-1">{course.progress}% complete</p>
                </div>
                <Link
                  href={`/learn/${course.slug}`}
                  className="bg-[#0056d2] hover:bg-[#004ab3] text-white font-semibold px-5 py-2 rounded text-sm transition-colors duration-150 shrink-0 text-center"
                >
                  Continue
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section>
          <h2 className="text-lg font-bold text-[#1c1d1f] mb-4">Certificates</h2>
          {certificates.length === 0 ? (
            <p className="text-[#6a6f73] text-sm">Complete a course to earn your first certificate.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.courseTitle} className="bg-white border border-[#d1d7dc] rounded-xl p-5 shadow-sm flex items-center gap-4">
                  <span className="text-3xl">🏆</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1c1d1f] text-sm">{cert.courseTitle}</h3>
                    <p className="text-xs text-[#6a6f73] mt-0.5">
                      Issued {new Date(cert.issuedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <button className="text-xs text-[#0056d2] font-semibold hover:underline">Download</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
