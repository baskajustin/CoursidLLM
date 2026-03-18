import Link from "next/link";
import Image from "next/image";

interface CourseCardProps {
  slug: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  isFree: boolean;
  level: string;
  category: string;
  thumbnailUrl?: string | null;
}

export default function CourseCard({
  slug,
  title,
  instructor,
  rating,
  students,
  price,
  isFree,
  level,
  category,
  thumbnailUrl,
}: CourseCardProps) {
  return (
    <Link
      href={`/course/${slug}`}
      className="bg-white rounded-xl border border-[#d1d7dc] shadow-sm hover:shadow-md transition-shadow duration-150 overflow-hidden flex flex-col"
    >
      <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt={title} width={320} height={180} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl">🎓</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-medium text-[#a435f0] uppercase tracking-wide">{category}</span>
        <h3 className="text-sm font-semibold text-[#1c1d1f] mt-1 line-clamp-2 flex-1">{title}</h3>
        <p className="text-xs text-[#6a6f73] mt-1">{instructor}</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs font-bold text-amber-600">{rating.toFixed(1)}</span>
          <span className="text-amber-400 text-xs">★★★★★</span>
          <span className="text-xs text-[#6a6f73]">({students.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          {isFree ? (
            <span className="text-sm font-bold text-[#1e7e34]">Free</span>
          ) : (
            <span className="text-sm font-bold text-[#1c1d1f]">${price.toFixed(2)}</span>
          )}
          <span className="text-xs px-2 py-0.5 bg-[#f7f9fa] border border-[#d1d7dc] rounded-full text-[#6a6f73]">
            {level}
          </span>
        </div>
      </div>
    </Link>
  );
}
