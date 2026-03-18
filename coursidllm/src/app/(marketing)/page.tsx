import Link from "next/link";

const featuredCourses = [
  {
    id: "1",
    slug: "intro-to-ai",
    title: "Introduction to Artificial Intelligence",
    instructor: "Dr. Sarah Chen",
    rating: 4.8,
    students: 12450,
    price: 49.99,
    isFree: false,
    level: "BEGINNER",
    category: "Technology",
    thumbnailUrl: null,
  },
  {
    id: "2",
    slug: "web-dev-bootcamp",
    title: "Full Stack Web Development Bootcamp",
    instructor: "Alex Rivera",
    rating: 4.7,
    students: 34210,
    price: 79.99,
    isFree: false,
    level: "INTERMEDIATE",
    category: "Technology",
    thumbnailUrl: null,
  },
  {
    id: "3",
    slug: "data-science-python",
    title: "Data Science with Python",
    instructor: "Prof. James Liu",
    rating: 4.9,
    students: 21300,
    price: 0,
    isFree: true,
    level: "BEGINNER",
    category: "Technology",
    thumbnailUrl: null,
  },
  {
    id: "4",
    slug: "ux-design-fundamentals",
    title: "UX Design Fundamentals",
    instructor: "Mia Thompson",
    rating: 4.6,
    students: 9870,
    price: 39.99,
    isFree: false,
    level: "BEGINNER",
    category: "Design",
    thumbnailUrl: null,
  },
];

const categories = [
  { name: "Technology", icon: "💻", count: 1240 },
  { name: "Design", icon: "🎨", count: 430 },
  { name: "Business", icon: "📊", count: 680 },
  { name: "Data Science", icon: "📈", count: 320 },
  { name: "Marketing", icon: "📣", count: 210 },
  { name: "Finance", icon: "💰", count: 190 },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#1c1d1f] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Learn without limits.
              <span className="text-[#a435f0]"> AI-powered</span> tutoring included.
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Expert-led courses across technology, design, and business — with a
              built-in Claude AI tutor that answers your questions in real time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/catalog"
                className="bg-[#0056d2] hover:bg-[#004ab3] text-white font-semibold px-8 py-3 rounded transition-colors duration-150 text-center"
              >
                Explore Courses
              </Link>
              <Link
                href="/signup"
                className="border border-white hover:bg-white hover:text-[#1c1d1f] text-white font-semibold px-8 py-3 rounded transition-colors duration-150 text-center"
              >
                Join for Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#f7f9fa] border-b border-[#d1d7dc] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: "100K+", label: "Learners" },
            { value: "2,800+", label: "Courses" },
            { value: "500+", label: "Expert Instructors" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-[#0056d2]">{stat.value}</div>
              <div className="text-sm text-[#6a6f73]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1c1d1f] mb-6">Top Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#d1d7dc] hover:border-[#0056d2] hover:shadow-md transition-all duration-150 text-center"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-semibold text-[#1c1d1f]">{cat.name}</span>
                <span className="text-xs text-[#6a6f73]">{cat.count} courses</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 px-4 bg-[#f7f9fa]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1c1d1f]">Featured Courses</h2>
            <Link href="/catalog" className="text-[#0056d2] text-sm font-semibold hover:underline">
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
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
                  <h3 className="text-sm font-semibold text-[#1c1d1f] mt-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#6a6f73] mt-1">{course.instructor}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-bold text-amber-600">{course.rating}</span>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                    <span className="text-xs text-[#6a6f73]">
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                  <div className="mt-2">
                    {course.isFree ? (
                      <span className="text-sm font-bold text-[#1e7e34]">Free</span>
                    ) : (
                      <span className="text-sm font-bold text-[#1c1d1f]">
                        ${course.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LLM Tutor CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#a435f0]/10 text-[#a435f0] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨ AI-Powered
          </div>
          <h2 className="text-3xl font-bold text-[#1c1d1f] mb-4">
            Your personal AI tutor, always available
          </h2>
          <p className="text-[#6a6f73] text-lg mb-8 max-w-2xl mx-auto">
            Every course comes with a Claude AI chat panel. Ask questions about any lesson
            and get instant, context-aware answers — like having a private tutor on call 24/7.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#0056d2] hover:bg-[#004ab3] text-white font-semibold px-10 py-3 rounded transition-colors duration-150"
          >
            Start Learning Free
          </Link>
        </div>
      </section>

      {/* Skills & Career Builder */}
      <section className="py-16 px-4 bg-[#f7f9fa]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-[#d1d7dc] p-8 shadow-sm">
            <div className="text-3xl mb-4">🧩</div>
            <h3 className="text-xl font-bold text-[#1c1d1f] mb-2">Skills Builder</h3>
            <p className="text-[#6a6f73] mb-6">
              Take a quick skills assessment and get a personalised learning path that
              closes your skills gaps and prepares you for your next role.
            </p>
            <Link
              href="/skills"
              className="inline-block border border-[#0056d2] text-[#0056d2] hover:bg-[#0056d2] hover:text-white font-semibold px-6 py-2 rounded transition-colors duration-150"
            >
              Assess my skills
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-[#d1d7dc] p-8 shadow-sm">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-[#1c1d1f] mb-2">Career Builder</h3>
            <p className="text-[#6a6f73] mb-6">
              Tell us your target role. We&apos;ll map your completed courses to job requirements
              and show you exactly what to learn next to get hired.
            </p>
            <Link
              href="/careers"
              className="inline-block border border-[#0056d2] text-[#0056d2] hover:bg-[#0056d2] hover:text-white font-semibold px-6 py-2 rounded transition-colors duration-150"
            >
              Build my career path
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
