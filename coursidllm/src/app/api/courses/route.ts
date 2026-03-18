import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const isFree = searchParams.get("free");
    const q = searchParams.get("q");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");

    const where = {
      published: true,
      ...(category && { category }),
      ...(level && { level: level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" }),
      ...(isFree === "true" && { isFree: true }),
      ...(q && {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { description: { contains: q, mode: "insensitive" as const } },
        ],
      }),
    };

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          instructor: { select: { id: true, name: true, avatarUrl: true } },
          _count: { select: { enrollments: true, reviews: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({ courses, total, page, limit });
  } catch (error) {
    console.error("[API /courses GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
