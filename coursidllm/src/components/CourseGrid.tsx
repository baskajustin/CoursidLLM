import CourseCard from "./CourseCard";

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: { name: string | null };
  price: number;
  isFree: boolean;
  level: string;
  category: string;
  thumbnailUrl?: string | null;
  _count?: { reviews: number; enrollments: number };
}

interface CourseGridProps {
  courses: Course[];
  emptyMessage?: string;
}

export default function CourseGrid({ courses, emptyMessage = "No courses found." }: CourseGridProps) {
  if (!courses.length) {
    return (
      <div className="text-center py-16 text-[#6a6f73]">
        <p className="text-4xl mb-4">🎓</p>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          slug={course.slug}
          title={course.title}
          instructor={course.instructor.name ?? "Instructor"}
          rating={4.5}
          students={course._count?.enrollments ?? 0}
          price={Number(course.price)}
          isFree={course.isFree}
          level={course.level}
          category={course.category}
          thumbnailUrl={course.thumbnailUrl}
        />
      ))}
    </div>
  );
}
