import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Course Catalogue" };

const LEVELS = ["All Levels", "BEGINNER", "INTERMEDIATE", "ADVANCED"];
const CATEGORIES = ["All", "Technology", "Design", "Business", "Data Science", "Marketing", "Finance"];

const mockCourses = [
  { id: "1", slug: "intro-to-ai", title: "Introduction to Artificial Intelligence", instructor: "Dr. Sarah Chen", rating: 4.8, students: 12450, price: 49.99, isFree: false, level: "BEGINNER", category: "Technology" },
  { id: "2", slug: "web-dev-bootcamp", title: "Full Stack Web Development Bootcamp", instructor: "Alex Rivera", rating: 4.7, students: 34210, price: 79.99, isFree: false, level: "INTERMEDIATE", category: "Technology" },
  { id: "3", slug: "data-science-python", title: "Data Science with Python", instructor: "Prof. James Liu", rating: 4.9, students: 21300, price: 0, isFree: true, level: "BEGINNER", category: "Data Science" },
  { id: "4", slug: "ux-design-fundamentals", title: "UX Design Fundamentals", instructor: "Mia Thompson", rating: 4.6, students: 9870, price: 39.99, isFree: false, level: "BEGINNER", category: "Design" },
  { id: "5", slug: "machine-learning-advanced", title: "Machine Learning: Advanced Techniques", instructor: "Dr. Kenji Watanabe", rating: 4.9, students: 7430, price: 89.99, isFree: false, level: "ADVANCED", category: "Technology" },
  { id: "6", slug: "digital-marketing", title: "Digital Marketing Mastery", instructor: "Sophie Laurent", rating: 4.5, students: 15600, price: 34.99, isFree: false, level: "BEGINNER", category: "Marketing" },
  { id: "7", slug: "financial-modelling", title: "Financial Modelling in Excel", instructor: "Marcus Obi", rating: 4.7, students: 8900, price: 0, isFree: true, level: "INTERMEDIATE", category: "Finance" },
  { id: "8", slug: "react-nextjs", title: "React & Next.js — The Complete Guide", instructor: "Alex Rivera", rating: 4.8, students: 28700, price: 59.99, isFree: false, level: "INTERMEDIATE", category: "Technology" },
];

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      <div className="bg-[#1c1d1f] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white">Course Catalogue</h1>
          <p className="text-gray-400 mt-1">{mockCourses.length} courses available</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-[#d1d7dc] rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-[#1c1d1f] mb-4">Filters</h2>

            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[#1c1d1f] mb-2">Category</h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-[#3d3d3d] hover:text-[#0056d2]">
                      <input type="radio" name="category" defaultChecked={cat === "All"} className="accent-[#0056d2]" />
                      {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[#1c1d1f] mb-2">Level</h3>
              <ul className="space-y-1">
                {LEVELS.map((lvl) => (
                  <li key={lvl}>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-[#3d3d3d] hover:text-[#0056d2]">
                      <input type="checkbox" className="accent-[#0056d2]" />
                      {lvl}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h3 className="text-sm font-semibold text-[#1c1d1f] mb-2">Price</h3>
              <ul className="space-y-1">
                {["All", "Free", "Paid"].map((p) => (
                  <li key={p}>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-[#3d3d3d] hover:text-[#0056d2]">
                      <input type="radio" name="price" defaultChecked={p === "All"} className="accent-[#0056d2]" />
                      {p}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Course grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {mockCourses.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.slug}`}
                className="bg-white rounded-xl border border-[#d1d7dc] shadow-sm hover:shadow-md transition-shadow duration-150 overflow-hidden"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <span className="text-4xl">🎓</span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-[#a435f0] uppercase tracking-wide">
                    {course.category}
                  </span>
                  <h3 className="text-sm font-semibold text-[#1c1d1f] mt-1 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-[#6a6f73] mt-1">{course.instructor}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-bold text-amber-600">{course.rating}</span>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                    <span className="text-xs text-[#6a6f73]">({course.students.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    {course.isFree ? (
                      <span className="text-sm font-bold text-[#1e7e34]">Free</span>
                    ) : (
                      <span className="text-sm font-bold text-[#1c1d1f]">${course.price}</span>
                    )}
                    <span className="text-xs px-2 py-0.5 bg-[#f7f9fa] border border-[#d1d7dc] rounded-full text-[#6a6f73]">
                      {course.level}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
